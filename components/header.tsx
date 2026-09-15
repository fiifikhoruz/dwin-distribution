"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "./store";
export function Header() {
  const { count, setCartOpen } = useStore(); const [menu,setMenu]=useState(false);
  return <><div className="announcement">A considered selection. For your table, your business, your occasion.</div><header className="site-header"><Link href="/" className="brand" aria-label="Dwin Distribution home" onClick={()=>setMenu(false)}><Image src="/brand/dwin-logo.png" alt="Dwin Distribution" width={190} height={64} priority/></Link><nav className="desktop-nav" aria-label="Main navigation"><Link href="/list">All products</Link><Link href="/list?collection=spirits">Spirits</Link><Link href="/list?collection=wines">Wines</Link><Link href="/list?collection=non-alcoholic">Non-alcoholic</Link><Link href="/#for-your-occasion">For your occasion</Link></nav><div className="header-actions"><Link href="/list#catalogue-search" className="icon-button" aria-label="Search the catalogue"><Search size={21}/></Link><button className="order-header" onClick={()=>setCartOpen(true)} aria-label={`Build an order, ${count} items`}><ShoppingBag size={19}/><span>Build an order</span><b>{count}</b></button><button className="icon-button mobile-menu-button" onClick={()=>setMenu(!menu)} aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button></div></header>{menu&&<nav className="mobile-nav" aria-label="Mobile navigation">{[['All products','/list'],['Spirits','/list?collection=spirits'],['Wines & champagne','/list?collection=wines'],['Non-alcoholic','/list?collection=non-alcoholic'],['For your occasion','/#for-your-occasion']].map(([text,url])=><Link key={url} href={url} onClick={()=>setMenu(false)}>{text}</Link>)}</nav>}</>;
}
