"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Moon, ShoppingBag, Sun } from "lucide-react";
import { useStore } from "./store";
export function Header({ home = false }: { home?: boolean }) {
  const { count, theme, toggleTheme, setCartOpen } = useStore();
  return <header className={`site-header ${home ? "home-header" : ""}`}>
    <Link className="brand" href="/" aria-label="Dwin Distribution home"><Image src="/brand/dwin-logo.png" alt="Dwin Distribution" width={182} height={61} priority /></Link>
    <span className="header-divider" /><span className="header-label">DRINKS PRICE LIST <span>2026</span></span>
    <nav aria-label="Main navigation">
      {home ? <Link href="/list" className="nav-link">Explore catalogue <ArrowUpRight size={16}/></Link> : <button className="cart-trigger" aria-label={`My cart ${count}`} onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>My cart</span><b>{count}</b></button>}
      <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun size={19}/> : <Moon size={19}/>}</button>
    </nav>
  </header>;
}
