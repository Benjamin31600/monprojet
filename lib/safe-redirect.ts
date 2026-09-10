/** Only allow same-origin application paths, including after URL normalization. */
export function safeReturnTo(value: unknown, fallback: string): string {
  if (typeof value !== "string" || value.length > 500 || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u0020]/.test(value)) return fallback;
  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith("//") || /[\\\u0000-\u001f]/.test(decoded)) return fallback;
    const url = new URL(value, "https://mycoco.invalid");
    return url.origin === "https://mycoco.invalid" ? `${url.pathname}${url.search}${url.hash}` : fallback;
  } catch { return fallback; }
}
