"use client";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "./store";
import { products, money } from "@/lib/catalogue";
import { Cart } from "./cart";
export function OrderShell(){const {count,cart,cartOpen,setCartOpen}=useStore();const total=products.reduce((sum,p)=>sum+(cart[p.id]||0)*p.price,0);return <>{count>0&&!cartOpen&&<button className="order-tray" onClick={()=>setCartOpen(true)}><ShoppingBag size={20}/><span><b>Your selection · {count} {count===1?'item':'items'}</b><small>GHS {money(total)} estimated</small></span><span className="tray-action">Review order <ArrowRight size={18}/></span></button>}{cartOpen&&<Cart/>}</>}
