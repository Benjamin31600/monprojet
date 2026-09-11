import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import HomeLandingV9 from "@/components/HomeLandingV9";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale:raw}=await params;if(!isLocale(raw))return{};const locale=raw as Locale;const fr=locale==='fr';const title=fr?"MyCoco | Trouver la bonne solution de garde":"MyCoco | Find the right childcare solution";const description=fr?"Trouvez les services de garde qui correspondent à votre famille, comparez vos options et gardez votre recherche organisée au même endroit.":"Find childcare services that fit your family, compare options and keep your search organized in one place.";return{title:{default:title,template:`%s | MyCoco`},description,alternates:{canonical:`/${locale}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}},openGraph:{locale:fr?"fr_CA":"en_CA",siteName:site.name,type:"website",title,description,url:`${site.url}/${locale}`},robots:{index:true,follow:true}};}
export default async function Home({params}:{params:Promise<{locale:string}>}){const{locale:raw}=await params;if(!isLocale(raw))notFound();return <HomeLandingV9 locale={raw as Locale}/>;}
