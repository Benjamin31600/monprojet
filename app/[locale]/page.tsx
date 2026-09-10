import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { BilingualHome } from "@/components/home-bilingual";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale:raw}=await params;if(!isLocale(raw))return{};const locale=raw as Locale;const fr=locale==='fr';const title=fr?"Garderies à Mirabel et dans les Laurentides | MyCoco":"Childcare in Mirabel and the Laurentians | MyCoco";const description=fr?"Explorez les CPE, garderies et milieux familiaux à Mirabel et dans les Laurentides. Recherche gratuite, sans compte. Disponibilités à confirmer auprès du service.":"Explore CPEs, daycares and home childcare in Mirabel and the Laurentians. Free search, no account required. Confirm openings directly with each provider.";return{title:{default:title,template:`%s | MyCoco`},description,alternates:{canonical:`/${locale}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}},openGraph:{locale:fr?"fr_CA":"en_CA",siteName:site.name,type:"website",title,description,url:`${site.url}/${locale}`},robots:{index:true,follow:true}};}
export default async function Home({params}:{params:Promise<{locale:string}>}){const{locale:raw}=await params;if(!isLocale(raw))notFound();return <BilingualHome locale={raw as Locale}/>;}
