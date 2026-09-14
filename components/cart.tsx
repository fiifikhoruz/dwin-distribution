"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Download, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { products, money, type Product } from "@/lib/catalogue";
import { useStore } from "./store";
import { Modal } from "./modal";
export function Quantity({ product }: { product: Product }) {
  const { cart, setQuantity } = useStore(); const quantity = cart[product.id] || 0;
  return quantity ? <div className="quantity-control"><button aria-label={`Remove one ${product.name}`} onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={14}/></button><input aria-label={`Quantity for ${product.name}`} type="number" min="0" max="999" value={quantity} onChange={e => setQuantity(product.id, Number(e.target.value))}/><button disabled={quantity >= 999} aria-label={`Add one ${product.name}`} onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={14}/></button></div> : <button className="add-button" aria-label={`Add ${product.name} to cart`} onClick={() => setQuantity(product.id, 1)}><Plus size={14}/><span>Add</span></button>;
}
export function Cart() {
  const { cart, setQuantity, clearCart, setCartOpen, count } = useStore();
  const [checkout, setCheckout] = useState(false); const [customer, setCustomer] = useState(""); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [reference, setReference] = useState("");
  const items = products.filter(p => cart[p.id]).map(product => ({ product, quantity: cart[product.id] }));
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  async function download() {
    setBusy(true); setError("");
    try { const id = reference || `DWIN-${new Date().toISOString().slice(0,10).replaceAll("-", "")}-${crypto.randomUUID().slice(0,8).toUpperCase()}`; const { downloadInvoice } = await import("@/lib/pdf"); await downloadInvoice(items, customer.trim(), id); setReference(id); } catch { setError("The invoice could not be downloaded. Please try again."); } finally { setBusy(false); }
  }
  return <Modal title={checkout ? "Your quotation" : "My cart"} className="cart-modal" onClose={() => setCartOpen(false)}>
    {!items.length ? <div className="empty-cart"><ShoppingBag size={42} strokeWidth={1}/><h3>A good selection starts here.</h3><p>Add a few favourites from the price list to build your quotation.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Browse the collection <ArrowRight size={17}/></button></div> : <>
      {!checkout ? <><div className="cart-meta"><span>{count} {count === 1 ? "unit" : "units"} · {items.length} {items.length === 1 ? "product" : "products"}</span><button className="text-button" onClick={clearCart}>Clear cart</button></div><div className="cart-items">{items.map(({product, quantity}) => <div className="cart-item" key={product.id}><div><span className="eyebrow">{product.brand}</span><h3>{product.name}</h3><p>{product.code} · GHS {money(product.price)} each</p><Quantity product={product}/></div><div className="cart-item-end"><strong>{money(product.price * quantity)}</strong><button className="icon-button" onClick={() => setQuantity(product.id, 0)} aria-label={`Remove ${product.name} from cart`}><Trash2 size={16}/></button></div></div>)}</div></> : <div className="checkout-body"><button className="text-button" onClick={() => { setCheckout(false); setReference(""); }}><ArrowLeft size={15}/> Back to cart</button>{reference ? <div className="download-success" role="status"><Check size={32}/><h3>Your invoice is ready.</h3><p>Download started for {customer}.</p><small>{reference}</small></div> : <><p className="checkout-copy">Add the customer’s name to create a branded pro forma invoice with your selected products.</p><label htmlFor="customer">Customer or business name</label><input id="customer" form="invoice-form" autoComplete="organization" maxLength={100} required value={customer} onChange={e => setCustomer(e.target.value)} placeholder="e.g. The Terrace Restaurant"/><p className="privacy-note">The name stays in your browser and the downloaded PDF.</p></>}</div>}
      <div className="cart-bottom"><div className="cart-total"><span>Total <small>(GHS)</small></span><strong>{money(total)}</strong></div><p className="sample-note">Sample prices. Availability, taxes and delivery subject to confirmation. No order will be sent.</p>{error && <p role="alert" className="error-message">{error}</p>}{checkout ? <form id="invoice-form" onSubmit={e => { e.preventDefault(); if (customer.trim()) void download(); }}><button className="primary-button wide" disabled={busy || !customer.trim()} type="submit"><Download size={17}/>{busy ? "Preparing invoice…" : reference ? "Download again" : "Download invoice PDF"}</button></form> : <button className="primary-button wide" onClick={() => setCheckout(true)}>Create invoice <ArrowRight size={17}/></button>}</div>
    </>}
  </Modal>;
}
