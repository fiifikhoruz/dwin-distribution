"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products } from "@/lib/catalogue";
type Store = { cart: Record<string, number>; setQuantity: (id: number, quantity: number) => void; clearCart: () => void; count: number; theme: string; toggleTheme: () => void; cartOpen: boolean; setCartOpen: (open: boolean) => void };
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [theme, setTheme] = useState("dark");
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("dwin-cart") || "{}");
      if (saved && typeof saved === "object" && !Array.isArray(saved)) {
        setCart(Object.fromEntries(Object.entries(saved).filter(([id, quantity]) => products.some(p => String(p.id) === id) && typeof quantity === "number" && Number.isInteger(quantity) && quantity > 0 && quantity <= 999)) as Record<string, number>);
      }
      setTheme(localStorage.getItem("dwin-theme") === "light" ? "light" : "dark");
    } catch { /* Storage is optional, including in private browsing. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (ready) try { localStorage.setItem("dwin-theme", theme); localStorage.setItem("dwin-cart", JSON.stringify(cart)); } catch { /* Keep in-memory functionality. */ }
  }, [cart, theme, ready]);
  const setQuantity = (id: number, quantity: number) => setCart(current => {
    const updated = { ...current };
    if (!Number.isFinite(quantity)) return current;
    if (quantity <= 0) delete updated[id]; else updated[id] = Math.min(999, Math.floor(quantity));
    return updated;
  });
  return <Context.Provider value={{ cart, setQuantity, clearCart: () => setCart({}), count: Object.values(cart).reduce((a, b) => a + b, 0), theme, toggleTheme: () => setTheme(t => t === "dark" ? "light" : "dark"), cartOpen, setCartOpen }}>{children}</Context.Provider>;
}
export function useStore() { const store = useContext(Context); if (!store) throw new Error("StoreProvider missing"); return store; }
