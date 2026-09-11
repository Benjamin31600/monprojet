type WelcomeInput = {
  to: string;
  name: string;
  locale: "fr" | "en";
  audience: "family" | "provider";
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char] || char));
}

export async function sendAccountWelcomeEmail(input: WelcomeInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.warn("MyCoco: account confirmation email skipped because RESEND_API_KEY or RESEND_FROM_EMAIL is missing.");
    return { sent: false as const, reason: "not_configured" as const };
  }

  const fr = input.locale === "fr";
  const safeName = escapeHtml(input.name || (fr ? "bonjour" : "hello"));
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://projet-garde.vercel.app").replace(/\/$/, "");
  const spaceUrl = `${baseUrl}/${input.locale}/${input.audience === "family" ? "espace-famille" : "espace-service"}`;
  const subject = input.audience === "family"
    ? (fr ? "Votre espace famille MyCoco est créé ✓" : "Your MyCoco family space is ready ✓")
    : (fr ? "Votre espace service MyCoco est créé ✓" : "Your MyCoco provider space is ready ✓");
  const headline = input.audience === "family"
    ? (fr ? "Votre espace famille est prêt." : "Your family space is ready.")
    : (fr ? "Votre espace service est prêt." : "Your provider space is ready.");
  const text = input.audience === "family"
    ? (fr ? "Vous pouvez maintenant garder votre profil et reprendre votre parcours MyCoco sans repartir de zéro." : "You can now keep your profile and continue your MyCoco journey without starting over.")
    : (fr ? "Vous pouvez maintenant compléter votre fiche et préparer votre présence auprès des familles de votre secteur." : "You can now complete your listing and prepare your presence for families in your area.");
  const cta = fr ? "Accéder à mon espace" : "Open my space";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject,
      html: `<!doctype html><html><body style="margin:0;background:#f7f4ee;font-family:Arial,sans-serif;color:#17352c"><div style="max-width:620px;margin:0 auto;padding:36px 18px"><div style="background:#ffffff;border:1px solid #e2e8e3;border-radius:22px;padding:32px"><div style="font-size:22px;font-weight:800;letter-spacing:-1px;margin-bottom:28px">my<span style="color:#ef7e61">coco</span></div><p style="font-size:14px;color:#68776f;margin:0 0 8px">${fr ? "Bonjour" : "Hello"} ${safeName},</p><h1 style="font-size:32px;line-height:1.05;letter-spacing:-1.5px;margin:0 0 16px">${headline}</h1><p style="font-size:15px;line-height:1.65;color:#65756d;margin:0 0 24px">${text}</p><a href="${spaceUrl}" style="display:inline-block;background:#17352c;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:14px 18px;border-radius:11px">${cta} →</a><div style="border-top:1px solid #e8ece9;margin-top:30px;padding-top:18px;font-size:12px;line-height:1.55;color:#7e8a84">${fr ? "MyCoco · La garde qui s’adapte à votre famille.<br>Si vous n’êtes pas à l’origine de cette création de compte, ignorez ce message et contactez-nous si nécessaire." : "MyCoco · Childcare that fits your family.<br>If you did not create this account, ignore this message and contact us if needed."}</div></div></div></body></html>`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("MyCoco: account confirmation email failed", response.status, detail.slice(0, 500));
    return { sent: false as const, reason: "provider_error" as const };
  }
  return { sent: true as const };
}
