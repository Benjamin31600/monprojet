import { readFile } from "node:fs/promises";
import path from "node:path";

export type ChildcareRecord = {
  id: string;
  slug: string;
  name: string;
  type: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  source: string;
  sourceUpdatedAt: string;
};

export type ChildcarePayload = {
  sourceUrl: string;
  updatedAt: string;
  count: number;
  records: ChildcareRecord[];
};

export async function getChildcareData(): Promise<ChildcarePayload> {
  try {
    const file = await readFile(path.join(process.cwd(), "data", "childcare.json"), "utf8");
    return JSON.parse(file) as ChildcarePayload;
  } catch {
    return { sourceUrl: "", updatedAt: "", count: 0, records: [] };
  }
}

export function normalize(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function typeLabel(type = "", fr = true) {
  const n = normalize(type);
  if (n.includes("centre de la petite enfance") || n === "cpe" || n.includes("cpe")) return "CPE";
  if (n.includes("subvention")) return fr ? "Garderie subventionnée" : "Subsidized daycare";
  if (n.includes("milieu familial") || n.includes("bureau coordonnateur")) return fr ? "Milieu familial" : "Home daycare";
  if (n.includes("non subvention") || n.includes("non-subvention")) return fr ? "Garderie non subventionnée" : "Non-subsidized daycare";
  return fr ? "Service de garde" : "Childcare service";
}

export function matchesType(record: ChildcareRecord, filter: string) {
  if (!filter) return true;
  const n = normalize(record.type);
  if (filter === "cpe") return n.includes("cpe") || n.includes("centre de la petite enfance");
  if (filter === "subventionnee") return n.includes("subvention");
  if (filter === "milieu-familial") return n.includes("milieu familial") || n.includes("bureau coordonnateur");
  if (filter === "non-subventionnee") return n.includes("non subvention") || n.includes("non-subvention");
  return true;
}

/**
 * Rank results by user intent without inventing availability.
 * The score is deliberately explainable: exact postal prefix > exact city > partial city > type.
 */
export function childcareSearchScore(record: ChildcareRecord, query = "", type = "") {
  const needle = normalize(query).replace(/\s+/g, "");
  const city = normalize(record.city).replace(/\s+/g, "");
  const postal = normalize(record.postalCode).replace(/\s+/g, "");
  let score = 0;

  if (!needle) score += 10;
  else if (postal === needle) score += 100;
  else if (postal.startsWith(needle) && needle.length >= 3) score += 85;
  else if (city === needle) score += 80;
  else if (city.includes(needle)) score += 55;
  else if (postal.includes(needle)) score += 40;

  if (type && matchesType(record, type)) score += 25;
  return score;
}

export function rankChildcare(records: ChildcareRecord[], query = "", type = "") {
  return [...records].sort((a, b) => childcareSearchScore(b, query, type) - childcareSearchScore(a, query, type));
}
