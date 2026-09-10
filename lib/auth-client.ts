"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_NEON_AUTH_URL ||
    "https://ep-rapid-firefly-awzlgmul.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth",
});
