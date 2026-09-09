import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const eventSchema = z.object({
  event: z.enum(["page_view", "cta_click", "form_start", "step_complete", "demand_submitted", "results_view", "provider_click"]),
  path: z.string().trim().max(300),
  locale: z.enum(["fr", "en"]).optional(),
  step: z.number().int().min(1).max(4).optional(),
  source: z.string().trim().max(450).optional(),
  sessionId: z.string().trim().min(8).max(120),
  providerId: z.string().trim().max(160).optional(),
  parentDemandId: z.string().uuid().optional(),
  metadata: z.record(z.string(), z.string().max(300)).optional(),
});

const MAX_BODY_BYTES = 20_000;

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}

export async function POST(request: NextRequest) {
  try {
    if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false }, { status: 413 });
    }

    const body = await request.json();
    const parsed = eventSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

    const sql = getSql();
    if (!sql) return NextResponse.json({ ok: true, stored: false }, { status: 202 });

    const event = parsed.data;
    const source = event.source || "";
    const metadata = {
      ...(event.metadata || {}),
      ...(event.step ? { step: String(event.step) } : {}),
    };

    await sql`
      INSERT INTO funnel_events
        (session_id, event_name, locale, path, source, medium, campaign, provider_id, parent_demand_id, metadata)
      VALUES
        (
          ${event.sessionId},
          ${event.event},
          ${event.locale || "fr"},
          ${event.path},
          ${source},
          ${source.match(/utm_medium=([^&]+)/)?.[1] || null},
          ${source.match(/utm_campaign=([^&]+)/)?.[1] || null},
          ${event.providerId || null},
          ${event.parentDemandId || null},
          ${JSON.stringify(metadata)}::jsonb
        )
    `;

    return NextResponse.json({ ok: true, stored: true }, { status: 202 });
  } catch {
    // Analytics must never block the user journey.
    return NextResponse.json({ ok: true, stored: false }, { status: 202 });
  }
}
