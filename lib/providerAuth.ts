import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";

const COOKIE = "mycoco_provider_session";
const DAYS = 7;

function sql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}

function secret() {
  return process.env.PROVIDER_AUTH_SECRET || process.env.NEXTAUTH_SECRET || process.env.DATABASE_URL || "";
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, expected] = stored.split(":");
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, "hex");
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createSession(accountId: string) {
  const exp = Date.now() + DAYS * 24 * 60 * 60 * 1000;
  const value = `${accountId}.${exp}`;
  return `${value}.${sign(value)}`;
}

export function verifySession(value: string | undefined) {
  if (!value || !secret()) return null;
  const parts = value.split(".");
  if (parts.length !== 3) return null;
  const [accountId, exp, signature] = parts;
  if (!accountId || !exp || !signature || Number(exp) < Date.now()) return null;
  const expected = sign(`${accountId}.${exp}`);
  if (expected.length !== signature.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
  return accountId;
}

export async function getProviderAccount() {
  const jar = await cookies();
  const accountId = verifySession(jar.get(COOKIE)?.value);
  if (!accountId) return null;
  const db = sql();
  if (!db) return null;
  const rows = await db`
    SELECT a.id, a.email, a.provider_id, p.name, p.city, p.provider_type
    FROM provider_accounts a
    JOIN providers p ON p.id = a.provider_id
    WHERE a.id = ${accountId}
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function setProviderSession(accountId: string) {
  const jar = await cookies();
  jar.set(COOKIE, createSession(accountId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DAYS * 24 * 60 * 60,
  });
}

export async function clearProviderSession() {
  const jar = await cookies();
  jar.set(COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
}
