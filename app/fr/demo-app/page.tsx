"use client";
import {useState} from "react";

const c={navy:'#19324D',cream:'#FFF8F0',yellow:'#FFD978',mint:'#BDEBD8',lav:'#E8E1FF',sky:'#DDEFFF',text:'#1D2940',muted:'#6F7A86',line:'#E7E1D8',white:'#fff'};
const btn=(active=false)=>({border:0,borderRadius:14,padding:'10px 8px',background:active?c.yellow:'transparent',color:c.navy,fontWeight:900,fontSize:11} as const);
const card={background:c.white,border:`1px solid ${c.line}`,borderRadius:18,padding:14} as const;

export default function Demo(){
 const[role,setRole]=useState<'parent'|'edu'>('parent');
 const[tab,setTab]=useState('home');
 return <main style={{minHeight:'100vh',background:'#ECEEF2',padding:'16px 0',fontFamily:'Arial,sans-serif',color:c.text}}>
  <div style={{width:'min(430px,100%)',margin:'auto',background:c.cream,minHeight:'820px',borderRadius:28,overflow:'hidden',boxShadow:'0 20px 60px rgba(25,50,77,.18)'}}>
   <header style={{padding:'18px',background:c.navy,color:'white',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <div><b style={{fontSize:25}}>mycoco<span style={{color:c.yellow}}>.</span></b><div style={{fontSize:9,opacity:.65}}>APERÇU MOBILE</div></div>
    <div style={{background:'rgba(255,255,255,.12)',padding:3,borderRadius:999}}>
     <button onClick={()=>{setRole('parent');setTab('home')}} style={{...btn(role==='parent'),color:role==='parent'?c.navy:'white'}}>Parent</button>
     <button onClick={()=>{setRole('edu');setTab('home')}} style={{...btn(role==='edu'),color:role==='edu'?c.navy:'white'}}>Éducatrice</button>
    </div>
   </header>
   {role==='parent'?<Parent tab={tab} setTab={setTab}/>:<Edu tab={tab} setTab={setTab}/>} 
  </div>
 </main>
}

function Parent({tab,setTab}:{tab:string,setTab:(s:string)=>void}){
 const events=[['08:14','☀️','Arrivée','Scott est arrivé de bonne humeur.'],['09:35','🍌','Collation','Banane et yogourt · tout mangé.'],['10:20','🎨','Activité','Peinture avec les doigts et comptines.'],['11:42','🥣','Dîner','Poulet, riz et légumes · ¾ mangé.'],['12:28','🌙','Sieste','Endormi depuis 38 min.']];
 return <><section style={{padding:'22px 18px 12px'}}><small style={{color:c.muted,fontWeight:800}}>Bonjour Benjamin 👋</small><h1 style={{fontSize:30,margin:'5px 0',letterSpacing:-1}}>La journée de Scott</h1><p style={{fontSize:11,color:c.muted,margin:0}}>Les Petits Explorateurs · Mirabel</p></section>
 <section style={{padding:'0 18px 14px'}}><div style={{background:c.navy,color:'white',borderRadius:19,padding:17}}><small style={{opacity:.7,fontWeight:900}}>EN CE MOMENT</small><div style={{display:'flex',gap:12,alignItems:'center',marginTop:12}}><span style={{fontSize:30}}>🌙</span><div><b style={{fontSize:19}}>Sieste</b><p style={{fontSize:11,opacity:.7,margin:'2px 0'}}>Depuis 38 minutes · Tout va bien</p></div></div></div></section>
 <nav style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4,padding:'0 12px 14px'}}>{[['home','Aujourd’hui','☀️'],['agenda','Agenda','📅'],['msg','Messages','💬'],['profil','Scott','👶']].map(([id,l,i])=><button key={id} onClick={()=>setTab(id)} style={btn(tab===id)}><div style={{fontSize:18}}>{i}</div>{l}</button>)}</nav>
 {tab==='home'&&<div style={{padding:'0 18px 85px'}}><h2 style={{fontSize:19}}>Son journal</h2><div style={{display:'grid',gap:8}}>{events.map(e=><div key={e[0]} style={{...card,display:'grid',gridTemplateColumns:'42px 40px 1fr',gap:9,alignItems:'center'}}><small style={{fontWeight:900,color:c.muted}}>{e[0]}</small><div style={{width:40,height:40,borderRadius:12,background:c.sky,display:'grid',placeItems:'center',fontSize:19}}>{e[1]}</div><div><b style={{fontSize:12}}>{e[2]}</b><p style={{fontSize:10,color:c.muted,margin:'3px 0',lineHeight:1.4}}>{e[3]}</p></div></div>)}</div></div>}
 {tab==='agenda'&&<List title="À venir" items={['Lundi · Sortie au parc du Domaine Vert','Vendredi · Journée pyjama','24 sept. · Photo de groupe']}/>} 
 {tab==='msg'&&<List title="Messages" items={['Marie-Claude · Scott a très bien mangé ce midi 😊','Vous · Super, merci beaucoup !']}/>} 
 {tab==='profil'&&<List title="Profil de Scott" items={['✓ Allergies : aucune connue','✓ Contact urgence : Marie · Maman','✓ Personnes autorisées : Benjamin, Marie, Nadine','✓ Consentement photo actif']}/>} </>
}

function Edu({tab,setTab}:{tab:string,setTab:(s:string)=>void}){
 const kids=['Scott R.','Emma L.','Léo B.','Jade M.','Noah C.','Mila P.'];
 return <><section style={{padding:'22px 18px 12px'}}><small style={{fontWeight:900,color:c.muted}}>ESPACE ÉDUCATRICE</small><h1 style={{fontSize:29,margin:'5px 0',letterSpacing:-1}}>Bonjour Marie-Claude.</h1><p style={{fontSize:11,color:c.muted}}>Groupe des Cocos · 6 enfants présents</p></section>
 <nav style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:5,padding:'0 12px 14px'}}>{[['home','Groupe','👥'],['add','Ajouter','＋'],['msg','Messages','💬']].map(([id,l,i])=><button key={id} onClick={()=>setTab(id)} style={btn(tab===id)}><div style={{fontSize:18}}>{i}</div>{l}</button>)}</nav>
 {tab==='home'&&<div style={{padding:'0 18px 85px'}}><div style={{...card,background:c.navy,color:'white',marginBottom:10}}><b>6 présents · 5 journaux à jour</b></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{kids.map((k,i)=><button onClick={()=>setTab('add')} key={k} style={{...card,textAlign:'left',color:c.text}}><div style={{width:40,height:40,borderRadius:12,background:i%2?c.lav:c.mint,display:'grid',placeItems:'center'}}>🧒</div><b style={{display:'block',marginTop:8}}>{k}</b><small style={{color:c.muted}}>Journal {i===5?'à compléter':'à jour'}</small></button>)}</div></div>}
 {tab==='add'&&<div style={{padding:'0 18px 85px'}}><h2 style={{fontSize:19}}>Ajouter au journal</h2><p style={{fontSize:11,color:c.muted}}>Scott R. · saisie rapide</p><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{[['🥣','Repas',c.yellow],['🌙','Sieste',c.sky],['🎨','Activité',c.lav],['😊','Humeur',c.mint],['📷','Photo',c.sky],['!','Incident','#FFD3CF']].map(x=><button key={x[1]} style={{border:0,borderRadius:18,padding:18,textAlign:'left',background:x[2],color:c.navy,fontWeight:900}}><div style={{fontSize:27,marginBottom:10}}>{x[0]}</div>{x[1]}</button>)}</div></div>}
 {tab==='msg'&&<List title="Messages parents" items={['Scott R. · Merci pour les nouvelles !','Emma L. · Elle arrivera vers 8 h 45 demain.','Noah C. · Noah sera absent vendredi.']}/>} </>
}

function List({title,items}:{title:string,items:string[]}){return <div style={{padding:'0 18px 85px'}}><h2 style={{fontSize:19}}>{title}</h2><div style={{display:'grid',gap:8}}>{items.map(x=><div key={x} style={card}><b style={{fontSize:12}}>{x}</b></div>)}</div></div>}
