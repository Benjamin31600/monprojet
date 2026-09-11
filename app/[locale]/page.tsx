import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import HomeLandingV14 from "@/components/HomeLandingV14";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams(){return locales.map(locale=>({locale}));}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale:raw}=await params;
  if(!isLocale(raw))return{};
  const locale=raw as Locale;
  const fr=locale==="fr";
  const title=fr?"MyCoco | Trouver une garderie, un CPE ou un milieu familial au Québec":"MyCoco | Find daycare, CPE or home childcare in Quebec";
  const description=fr?"MyCoco aide les familles à trouver et comparer les services de garde selon leur secteur et leurs besoins, puis à garder leur recherche organisée.":"MyCoco helps families find and compare childcare around their area and needs, then keep their search organized.";
  return{title,description,alternates:{canonical:`/${locale}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}},openGraph:{locale:fr?"fr_CA":"en_CA",alternateLocale:fr?["en_CA"]:["fr_CA"],siteName:site.name,type:"website",title,description,url:`${site.url}/${locale}`},robots:{index:true,follow:true}};
}

export default async function Home({params}:{params:Promise<{locale:string}>}){
  const{locale:raw}=await params;
  if(!isLocale(raw))notFound();
  return <HomeLandingV14 locale={raw as Locale}/>;
}
