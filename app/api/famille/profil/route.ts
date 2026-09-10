import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getCurrentFamily } from "@/lib/family-auth";

function sqlClient(){const url=process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.NEON_DATABASE_URL;return url?neon(url):null;}
export async function POST(request:NextRequest){const locale=request.nextUrl.searchParams.get("locale")==="en"?"en":"fr";const family=await getCurrentFamily();if(!family)return NextResponse.redirect(new URL(`/${locale}/espace-famille/connexion`,request.url),303);const form=await request.formData();const cityOrPostal=String(form.get("cityOrPostal")||"").trim().slice(0,120);const sql=sqlClient();if(sql)await sql`UPDATE family_profiles SET city_or_postal=${cityOrPostal||null},updated_at=now() WHERE family_account_id=${family.id}`;return NextResponse.redirect(new URL(`/${locale}/espace-famille/profil?saved=1`,request.url),303);}
