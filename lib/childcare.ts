import { readFile } from "node:fs/promises";
import path from "path";

export type ChildcareRecord = {
  id: string;
  slug: string;
  name: string;
  type: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  latitude: number | null;
  longitude: number | null;
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

export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function childcareSearchScore(record: ChildcareRecord, query = "", type = "", userLat?: number, userLon?: number) {
  const needle = normalize(query).replace(/\s+/g, "");
  const city = normalize(record.city).replace(/\s+/g, "");
  const postal = normalize(record.postalCode).replace(/\s+/g, "");
  let score = 0;
  if (needle) {
    if (postal === needle) score += 100;
    else if (postal.startsWith(needle) && needle.length >= 3) score += 85;
    else if (city === needle) score += 80;
    else if (city.includes(needle)) score += 55;
    else if (postal.includes(needle)) score += 40;
  } else score += 10;
  if (userLat !== undefined && userLon !== undefined && record.latitude !== null && record.longitude !== null) {
    score += Math.max(0, 80 - distanceKm(userLat, userLon, record.latitude, record.longitude) * 8);
  }
  if (type && matchesType(record, type)) score += 25;
  return score;
}

export function rankChildcare(records: ChildcareRecord[], query = "", type = "", userLat?: number, userLon?: number) {
  return [...records].sort((a, b) => childcareSearchScore(b, query, type, userLat, userLon) - childcareSearchScore(a, query, type, userLat, userLon));
}
