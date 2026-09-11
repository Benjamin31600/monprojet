import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import HomeLandingV9 from "@/components/HomeLandingV9";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams(){return locales.map(locale=>({locale}));}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const{locale:raw}=await params;
  if(!isLocale(raw))return{};
  const locale=raw as Locale;
  const fr=locale==='fr';
  const title=fr?"MyCoco | L’écosystème des familles, en commençant par la garde":"MyCoco | The family ecosystem, starting with childcare";
  const description=fr?"MyCoco aide les familles à trouver la bonne solution de garde aujourd’hui, puis à réunir demain activités, camps, événements, professionnels et solutions de secours dans un même espace.":"MyCoco helps families find the right childcare today, then brings activities, camps, events, professionals and backup solutions into one family space.";
  return{title:{default:title,template:`%s | MyCoco`},description,alternates:{canonical:`/${locale}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}},openGraph:{locale:fr?"fr_CA":"en_CA",siteName:site.name,type:"website",title,description,url:`${site.url}/${locale}`},robots:{index:true,follow:true}};
}

export default async function Home({params}:{params:Promise<{locale:string}>}){
  const{locale:raw}=await params;
  if(!isLocale(raw))notFound();
  return <HomeLandingV9 locale={raw as Locale}/>;
}
