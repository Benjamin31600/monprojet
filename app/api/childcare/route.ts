import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const revalidate = 86400;

type ChildcareRecord = {
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

export async function GET() {
  try {
    const file = await readFile(path.join(process.cwd(), "data", "childcare.json"), "utf8");
    const payload = JSON.parse(file) as { updatedAt: string; count: number; records: ChildcareRecord[] };
    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json(
      { updatedAt: null, count: 0, records: [], message: "Childcare data will be available after the first production data sync." },
      { status: 503 },
    );
  }
}
