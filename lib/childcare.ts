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
  installationCode?: string | null;
  capacityTotal?: number | null;
  capacityServices?: string[];
  capacitySource?: string | null;
  capacitySourceUpdatedAt?: string | null;
  source: string;
  sourceUpdatedAt: string;
};

export type ChildcarePayload = {
  sourceUrl: string;
  updatedAt: string;
  count: number;
  capacitySourceUrl?: string;
  capacityMatches?: number;
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
  if (n.includes("non subvention") || n.includes("non-subvention")) return fr ? "Garderie non subventionnée" : "Non-subsidized daycare";
  if (n.includes("subvention")) return fr ? "Garderie subventionnée" : "Subsidized daycare";
  if (n.includes("milieu familial") || n.includes("bureau coordonnateur")) return fr ? "Milieu familial" : "Home daycare";
  return fr ? "Service de garde" : "Childcare service";
}

export function matchesType(record: ChildcareRecord, filter: string) {
  if (!filter) return true;
  const f = normalize(filter);
  const n = normalize(record.type);
  if (f === "cpe") return n === "cpe" || n.includes("cpe") || n.includes("centre de la petite enfance");
  if (f.includes("subventionnee") || f.includes("subventionnée")) return n.includes("subvention") && !n.includes("non subvention") && !n.includes("non-subvention");
  if (f.includes("milieu familial")) return n.includes("milieu familial") || n.includes("bureau coordonnateur");
  if (f.includes("non subventionnee") || f.includes("non subventionnée") || f.includes("garderie privee") || f.includes("garderie privée")) return n.includes("non subvention") || n.includes("non-subvention");
  return true;
}

function serviceSignals(record: ChildcareRecord) {
  return (record.capacityServices || []).map(normalize).join(" ");
}

function ageSignal(record: ChildcareRecord, age = "") {
  if (!age) return false;
  const services = serviceSignals(record);
  if (!services) return false;
  if (age === "0-18") return /(poupon|poupons|0.?18|moins de 18|18 mois)/.test(services);
  if (age === "18-36") return /(poupon|poupons|18.?36|18 mois|24 mois|36 mois|18.?36 mois)/.test(services);
  if (age === "3-5") return /(3.?5|3 ans|4 ans|5 ans|prescolaire|prescolaires)/.test(services);
  if (age === "5+") return /(5 ans|6 ans|7 ans|8 ans|scolaire|scolaires)/.test(services);
  return false;
}

export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function childcareSearchScore(record: ChildcareRecord, query = "", type = "", userLat?: number, userLon?: number, age = "") {
  const needle = normalize(query).replace(/\s+/g, "");
  const city = normalize(record.city).replace(/\s+/g, "");
  const postal = normalize(record.postalCode).replace(/\s+/g, "");
  let score = 0;

  if (needle) {
    if (postal === needle) score += 110;
    else if (postal.startsWith(needle) && needle.length >= 3) score += 90;
    else if (city === needle) score += 85;
    else if (city.includes(needle)) score += 60;
    else if (postal.includes(needle)) score += 45;
  } else {
    score += 10;
  }

  if (userLat !== undefined && userLon !== undefined && record.latitude !== null && record.longitude !== null) {
    score += Math.max(0, 80 - distanceKm(userLat, userLon, record.latitude, record.longitude) * 8);
  }

  if (type && matchesType(record, type)) score += 30;
  if (age && ageSignal(record, age)) score += 28;
  if (record.capacityTotal && record.capacityTotal > 0) score += 4;
  return score;
}

export function matchReasons(record: ChildcareRecord, query = "", type = "", fr = true, age = "") {
  const reasons: string[] = [];
  const needle = normalize(query);
  const city = normalize(record.city);
  const postal = normalize(record.postalCode).replace(/\s+/g, "");

  if (needle && (city === needle || city.includes(needle) || postal.startsWith(needle.replace(/\s+/g, "")))) {
    reasons.push(fr ? "Secteur recherché" : "Requested area");
  }
  if (type && matchesType(record, type)) {
    reasons.push(fr ? typeLabel(record.type, true) : typeLabel(record.type, false));
  }
  if (age && ageSignal(record, age)) {
    reasons.push(fr ? "Service compatible avec l'âge indiqué" : "Service aligned with the child's age");
  }
  return reasons;
}

export function rankChildcare(records: ChildcareRecord[], query = "", type = "", userLat?: number, userLon?: number, age = "") {
  return [...records].sort((a, b) => childcareSearchScore(b, query, type, userLat, userLon, age) - childcareSearchScore(a, query, type, userLat, userLon, age));
}
