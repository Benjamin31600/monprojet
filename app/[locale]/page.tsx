import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site, cities } from "@/lib/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { BilingualHome } from "@/components/home-bilingual";

export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale:raw}=await params;if(!isLocale(raw))return{};const fr=raw==='fr';return{title:fr?"MyCoco | Trouver la bonne solution de garde":"MyCoco | Find the right childcare solution",description:fr?"Comparez les services de garde, créez votre recherche et connectez-vous aux services qui correspondent à votre famille.":"Compare childcare services, build your search and connect with providers that fit your family.",alternates:{canonical:`/${raw}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}},openGraph:{title:fr?"MyCoco | Trouver la bonne solution":"MyCoco | Find the right solution",description:fr?"La garde qui s’adapte à votre famille.":"Childcare that fits your family.",url:`${site.url}/${raw}`,siteName:site.name,type:"website"},robots:{index:true,follow:true}};}
export default async function Home({params}:{params:Promise<{locale:string}>}){const{locale:raw}=await params;if(!isLocale(raw))notFound();return <BilingualHome locale={raw as Locale} cities={cities}/>;}
