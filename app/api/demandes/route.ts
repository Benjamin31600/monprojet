import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveParentDemand } from "@/lib/demandes";

const demandSchema = z.object({
  locale: z.enum(["fr", "en"]).default("fr"),
  ville: z.string().trim().min(2).max(120),
  age: z.enum(["0-18", "18-36", "3-5", "5+"]),
  type: z.string().trim().max(80).default(""),
  debut: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const parsed = demandSchema.safeParse({
      locale: form.get("locale") || "fr",
      ville: form.get("ville") || "",
      age: form.get("age") || "",
      type: form.get("type") || "",
      debut: form.get("debut") || "",
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid childcare request" }, { status: 400 });
    }

    const result = await saveParentDemand({
      locale: parsed.data.locale,
      cityOrPostal: parsed.data.ville,
      ageRange: parsed.data.age,
      childcareType: parsed.data.type,
      desiredStartDate: parsed.data.debut || null,
      source: "mon-besoin",
    });

    if (!result.saved) {
      return NextResponse.json({ error: "Database is not configured" }, { status: 503 });
    }

    const url = new URL(`/${parsed.data.locale}/garderies`, request.url);
    url.searchParams.set("ville", parsed.data.ville);
    url.searchParams.set("age", parsed.data.age);
    if (parsed.data.type) url.searchParams.set("type", parsed.data.type);
    if (parsed.data.debut) url.searchParams.set("debut", parsed.data.debut);
    url.searchParams.set("demande", "enregistree");

    return NextResponse.redirect(url, 303);
  } catch {
    return NextResponse.json({ error: "Unable to save childcare request" }, { status: 500 });
  }
}
