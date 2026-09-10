import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getProviderAccount } from "@/lib/providerAuth";

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}

export async function GET() {
  const account = await getProviderAccount();
  if (!account) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sql = db();
  if (!sql) return NextResponse.json({ messages: [] });
  const messages = await sql`
    SELECT id, sender_type, sender_name, subject, body, read_at, created_at
    FROM provider_messages
    WHERE provider_id = ${account.provider_id}
    ORDER BY created_at DESC
    LIMIT 100
  `;
  return NextResponse.json({ messages });
}

export async function POST(request: NextRequest) {
  const account = await getProviderAccount();
  if (!account) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "");
  if (!id) return NextResponse.json({ error: "Missing message id" }, { status: 400 });
  const sql = db();
  if (!sql) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  await sql`UPDATE provider_messages SET read_at = now() WHERE id = ${id} AND provider_id = ${account.provider_id}`;
  return NextResponse.json({ ok: true });
}
