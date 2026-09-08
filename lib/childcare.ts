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
