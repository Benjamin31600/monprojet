import { NextResponse } from "next/server";
import { z } from "zod";

const eventSchema = z.object({
  event: z.enum([
    "page_view",
    "cta_click",
    "form_start",
    "step_complete",
    "demand_submitted",
    "results_view",
    "provider_click",
  ]),
  path: z.string().max(300),
  locale: z.enum(["fr", "en"]).optional(),
  step: z.number().int().min(1).max(10).optional(),
  source: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = eventSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

    // Privacy-first: only aggregate funnel signals are logged. No IP, email,
    // name, child information, or session identifier is stored server-side.
    console.info("MYCOCO_FUNNEL", JSON.stringify({
      ...parsed.data,
      ts: new Date().toISOString(),
    }));

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
