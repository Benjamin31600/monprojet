import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";

const SESSION_COOKIE = "mycoco_family_session";
const SESSION_DAYS = 30;

function sqlClient() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

function normalizeEmail(email: string) { return email.trim().toLowerCase(); }

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${derived}`;
}

export function verifyPassword(password: string, encoded: string) {
  const [scheme, salt, stored] = encoded.split(":");
  if (scheme !== "scrypt" || !salt || !stored) return false;
  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(stored, "hex");
  return expected.length === derived.length && timingSafeEqual(expected, derived);
}

function hashToken(token: string) { return createHash("sha256").update(token).digest("hex"); }

export async function createFamilyAccount(input: { email: string; password: string; firstName: string; lastName?: string; phone?: string; locale: "fr" | "en" }) {
  const sql = sqlClient();
  if (!sql) return { ok: false as const, reason: "database_not_configured" as const };
  const email = normalizeEmail(input.email);
  const passwordHash = hashPassword(input.password);
  try {
    const rows = await sql`
      INSERT INTO family_accounts (email, password_hash, first_name, last_name, phone, locale)
      VALUES (${email}, ${passwordHash}, ${input.firstName.trim()}, ${input.lastName?.trim() || null}, ${input.phone?.trim() || null}, ${input.locale})
      RETURNING id, email, first_name, last_name, phone, locale
    `;
    const account = rows[0];
    await sql`INSERT INTO family_profiles (family_account_id) VALUES (${account.id}) ON CONFLICT (family_account_id) DO NOTHING`;
    return { ok: true as const, account };
  } catch (error: unknown) {
    const message = String(error);
    if (message.includes("family_accounts_email_key")) return { ok: false as const, reason: "email_exists" as const };
    console.error("MyCoco: unable to create family account", error);
    return { ok: false as const, reason: "database_error" as const };
  }
}

export async function authenticateFamily(emailInput: string, password: string) {
  const sql = sqlClient();
  if (!sql) return null;
  const email = normalizeEmail(emailInput);
  const rows = await sql`SELECT id, email, password_hash, first_name, last_name, phone, locale FROM family_accounts WHERE email = ${email} LIMIT 1`;
  const account = rows[0];
  if (!account || !verifyPassword(password, account.password_hash)) return null;
  return account;
}

export async function startFamilySession(accountId: string) {
  const sql = sqlClient();
  if (!sql) return false;
  const rawToken = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString();
  await sql`INSERT INTO auth_sessions (family_account_id, token_hash, expires_at) VALUES (${accountId}, ${tokenHash}, ${expiresAt})`;
  const store = await cookies();
  store.set(SESSION_COOKIE, rawToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires: new Date(expiresAt) });
  return true;
}

export async function endFamilySession() {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  const sql = sqlClient();
  if (raw && sql) await sql`DELETE FROM auth_sessions WHERE token_hash = ${hashToken(raw)}`;
  store.delete(SESSION_COOKIE);
}

export async function getCurrentFamily() {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  const sql = sqlClient();
  if (!raw || !sql) return null;
  const rows = await sql`
    SELECT a.id, a.email, a.first_name, a.last_name, a.phone, a.locale,
           p.city_or_postal, p.children, p.preferences
    FROM auth_sessions s
    JOIN family_accounts a ON a.id = s.family_account_id
    LEFT JOIN family_profiles p ON p.family_account_id = a.id
    WHERE s.token_hash = ${hashToken(raw)} AND s.expires_at > now()
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function createPasswordReset(emailInput: string) {
  const sql = sqlClient();
  if (!sql) return { ok: false as const, reason: "database_not_configured" as const };
  const email = normalizeEmail(emailInput);
  const rows = await sql`SELECT id, email, first_name, locale FROM family_accounts WHERE email = ${email} LIMIT 1`;
  const account = rows[0];
  if (!account) return { ok: true as const };
  const rawToken = randomBytes(32).toString("base64url");
  await sql`DELETE FROM password_reset_tokens WHERE family_account_id = ${account.id} OR expires_at < now()`;
  await sql`INSERT INTO password_reset_tokens (family_account_id, token_hash, expires_at) VALUES (${account.id}, ${hashToken(rawToken)}, ${new Date(Date.now() + 60 * 60 * 1000).toISOString()})`;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const resetUrl = `${base}/${account.locale || "fr"}/reinitialiser-mot-de-passe?token=${encodeURIComponent(rawToken)}`;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (resendKey && from) {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [account.email], subject: "Réinitialiser votre mot de passe MyCoco", html: `<p>Bonjour ${account.first_name},</p><p>Vous avez demandé à réinitialiser votre mot de passe MyCoco.</p><p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p><p>Ce lien expire dans 1 heure.</p>` }) });
    if (!response.ok) console.error("MyCoco: reset email failed", await response.text());
  } else {
    console.warn("MyCoco: password reset email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.");
  }
  return { ok: true as const };
}

export async function resetFamilyPassword(rawToken: string, newPassword: string) {
  const sql = sqlClient();
  if (!sql) return { ok: false as const, reason: "database_not_configured" as const };
  const rows = await sql`SELECT id, family_account_id FROM password_reset_tokens WHERE token_hash = ${hashToken(rawToken)} AND used_at IS NULL AND expires_at > now() LIMIT 1`;
  const token = rows[0];
  if (!token) return { ok: false as const, reason: "invalid_token" as const };
  const passwordHash = hashPassword(newPassword);
  await sql`UPDATE family_accounts SET password_hash = ${passwordHash}, updated_at = now() WHERE id = ${token.family_account_id}`;
  await sql`UPDATE password_reset_tokens SET used_at = now() WHERE id = ${token.id}`;
  await sql`DELETE FROM auth_sessions WHERE family_account_id = ${token.family_account_id}`;
  return { ok: true as const, accountId: token.family_account_id };
}
