import { mkdir, writeFile } from "node:fs/promises";

const SOURCE_URL = "https://www.donneesquebec.ca/recherche/dataset/be36f85e-e419-4978-9c34-cb5795622595/resource/89af3537-4506-488c-8d0e-6d85b4033a0e/download/repertoire-installation.csv";
const OUTPUT = "data/childcare.json";
const SOURCE_UPDATED_AT = "2026-09-04";

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (ch === '"' && quoted && next === '"') { cell += '"'; i++; continue; }
    if (ch === '"') { quoted = !quoted; continue; }
    if (!quoted && (ch === ';' || ch === ',')) { row.push(cell); cell = ""; continue; }
    if (!quoted && (ch === "\n" || ch === "\r")) {
      if (ch === "\r" && next === "\n") i++;
      row.push(cell); cell = "";
      if (row.some(Boolean)) rows.push(row);
      row = [];
      continue;
    }
    cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function normalize(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function pick(headers, candidates) {
  const normalized = headers.map(normalize);
  for (const candidate of candidates) {
    const needle = normalize(candidate);
    const index = normalized.findIndex((h) => h === needle || h.includes(needle));
    if (index >= 0) return index;
  }
  return -1;
}
function slugify(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function numberOrNull(value) {
  const normalized = String(value ?? "").trim().replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

const response = await fetch(SOURCE_URL, { headers: { "user-agent": "MyCoco/1.0" } });
if (!response.ok) throw new Error(`Unable to download Quebec childcare dataset: ${response.status}`);
const text = await response.text();
const rows = parseCsv(text);
if (rows.length < 2) throw new Error("The Quebec childcare dataset is empty or could not be parsed.");

const headers = rows[0];
const indexes = {
  name: pick(headers, ["Nom de l'installation", "Nom installation", "Nom"]),
  type: pick(headers, ["Type de service", "Type d'installation", "Type"]),
  address: pick(headers, ["Adresse", "Adresse de l'installation"]),
  city: pick(headers, ["Municipalite", "Municipalité", "Ville"]),
  postal: pick(headers, ["Code postal", "Code postal de l'installation"]),
  phone: pick(headers, ["Téléphone", "Telephone"]),
  latitude: pick(headers, ["Latitude", "Lat", "Coordonnée latitude", "Coordonnee latitude"]),
  longitude: pick(headers, ["Longitude", "Long", "Coordonnée longitude", "Coordonnee longitude"]),
};

const records = rows.slice(1).map((row, index) => {
  const get = (key) => indexes[key] >= 0 ? String(row[indexes[key]] ?? "").trim() : "";
  const name = get("name");
  const city = get("city");
  if (!name) return null;
  return {
    id: `${slugify(name)}-${index}`,
    slug: `${slugify(name)}-${slugify(city) || "quebec"}-${index}`,
    name,
    type: get("type") || "Service de garde",
    city,
    address: get("address"),
    postalCode: get("postal"),
    phone: get("phone"),
    latitude: numberOrNull(get("latitude")),
    longitude: numberOrNull(get("longitude")),
    source: "Ministère de la Famille — Données Québec",
    sourceUpdatedAt: SOURCE_UPDATED_AT,
  };
}).filter(Boolean);

if (!records.length) throw new Error("No childcare records were recognized from the Quebec dataset.");

await mkdir("data", { recursive: true });
await writeFile(OUTPUT, JSON.stringify({ sourceUrl: SOURCE_URL, updatedAt: SOURCE_UPDATED_AT, count: records.length, records }, null, 2) + "\n");
console.log(`MyCoco: synced ${records.length} childcare records to ${OUTPUT}`);
