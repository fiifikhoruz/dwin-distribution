"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpDown, Check, ChevronDown, Download, HelpCircle, Search, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { brands, categories, collections, countries, money, products, titleCase } from "@/lib/catalogue";
import { Header } from "./header";
import { Cart, Quantity } from "./cart";
import { Modal } from "./modal";
import { useStore } from "./store";

export function Catalogue() {
  const params = useSearchParams(); const initial = params.get("collection") || "all";
  const [collection, setCollection] = useState(collections[initial] ? initial : "all");
  const [query, setQuery] = useState(""); const [category, setCategory] = useState(""); const [brand, setBrand] = useState(""); const [country, setCountry] = useState("");
  const [updated, setUpdated] = useState(false); const [sort, setSort] = useState("name");
  const [open, setOpen] = useState<Set<string>>(new Set(["BITTERS"]));
  const [collapsedFiltered, setCollapsedFiltered] = useState<Set<string>>(new Set());
  const [help, setHelp] = useState(false); const [busy, setBusy] = useState(false); const [message, setMessage] = useState("");
  const { count, cartOpen, setCartOpen } = useStore();
  const hasFilters = Boolean(query || category || brand || country || updated);
  const filtered = useMemo(() => products.filter(p =>
    (collection === "all" || collections[collection]?.includes(p.category)) && (!category || p.category === category) && (!brand || p.brand === brand) && (!country || p.region === country) && (!updated || p.status === "updated" || p.status === "new") && (!query || `${p.name} ${p.brand} ${p.code} ${p.category} ${p.region}`.toLowerCase().includes(query.toLowerCase().trim()))
  ).sort((a, b) => sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : a.name.localeCompare(b.name)), [query, category, brand, country, updated, sort, collection]);
  const visibleCategories = categories.filter(c => filtered.some(p => p.category === c));
  const categoryOptions = collection === "all" ? categories : categories.filter(c => collections[collection].includes(c));
  const available = products.filter(p => (collection === "all" || collections[collection].includes(p.category)) && (!category || p.category === category));
  const brandOptions = brands.filter(b => available.some(p => p.brand === b));
  const countryOptions = countries.filter(c => available.some(p => p.region === c));
  const changeCollection = (value: string) => { setCollection(value); setCategory(""); setBrand(""); setCountry(""); setOpen(new Set()); const url = new URL(window.location.href); if (value === "all") url.searchParams.delete("collection"); else url.searchParams.set("collection", value); window.history.replaceState(null, "", url); };
  const reset = () => { setQuery(""); setCategory(""); setBrand(""); setCountry(""); setUpdated(false); setSort("name"); };
  const toggleCategory = (value: string) => setOpen(current => { const next = new Set(current); if (next.has(value)) next.delete(value); else next.add(value); return next; });
  async function download() { setBusy(true); setMessage(""); try { const {downloadPriceList} = await import("@/lib/pdf"); await downloadPriceList(filtered); setMessage("Your price list has been downloaded."); } catch { setMessage("Download failed. Please try again."); } finally { setBusy(false); } }
  return <><a className="skip-link" href="#products">Skip to products</a><Header/>
    <main className="catalogue-main">
      <div className="catalogue-heading"><div><Link href="/" className="back-link"><ArrowLeft size={14}/> The collection</Link><div className="title-row"><h1>Price list <em>2026</em></h1><span className="sample-badge">SAMPLE CATALOGUE</span></div><p>Your favourites. All in one place. <span className="heading-date">Reference updated 14 July 2026</span></p></div><div className="heading-actions"><button className="icon-button" onClick={() => setHelp(true)} aria-label="How to use this catalogue"><HelpCircle size={21}/></button><button className="secondary-button" onClick={download} disabled={busy || !filtered.length}><Download size={17}/>{busy ? "Preparing PDF…" : "Download price list"}</button></div></div>
      <div className="collection-tabs" role="group" aria-label="Choose a collection">{[["all", "All drinks"], ["spirits", "Spirits"], ["wines", "Wines & champagnes"], ["non-alcoholic", "Non-alcoholic"]].map(([value,label]) => <button key={value} aria-pressed={collection === value} className={collection === value ? "active" : ""} onClick={() => changeCollection(value)}>{label}{value === "all" && <span>{products.length.toLocaleString()}</span>}</button>)}</div>
      <section className="filters" aria-label="Filter products"><div className="search-field"><Search size={19}/><label className="sr-only" htmlFor="search">Search products</label><input id="search" type="search" placeholder="Search by product, brand or item code…" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button className="icon-button" aria-label="Clear search" onClick={() => setQuery("")}><X size={16}/></button>}</div><div className="filter-select"><label className="sr-only" htmlFor="category">Category</label><select id="category" value={category} onChange={e => { setCategory(e.target.value); setBrand(""); setCountry(""); }}><option value="">All categories</option>{categoryOptions.map(c => <option key={c} value={c}>{titleCase(c)}</option>)}</select><ChevronDown size={15}/></div><div className="filter-select"><label className="sr-only" htmlFor="brand">Brand</label><select id="brand" value={brand} onChange={e => setBrand(e.target.value)}><option value="">All brands</option>{brandOptions.map(b => <option key={b} value={b}>{titleCase(b)}</option>)}</select><ChevronDown size={15}/></div><div className="filter-select"><label className="sr-only" htmlFor="country">Country</label><select id="country" value={country} onChange={e => setCountry(e.target.value)}><option value="">All countries</option>{countryOptions.map(c => <option key={c} value={c}>{titleCase(c)}</option>)}</select><ChevronDown size={15}/></div></section>
      <div className="results-toolbar"><p>Showing <strong>{filtered.length.toLocaleString()}</strong> products <span>across {visibleCategories.length} {visibleCategories.length === 1 ? "category" : "categories"}</span></p><div><button className={`updates-button ${updated ? "selected" : ""}`} aria-pressed={updated} onClick={() => setUpdated(!updated)}>{updated ? <Check size={14}/> : <span className="update-dot"/>}New & updated</button><div className="sort-select"><ArrowUpDown size={14}/><label className="sr-only" htmlFor="sort">Sort products</label><select id="sort" value={sort} onChange={e => setSort(e.target.value)}><option value="name">Name: A–Z</option><option value="asc">Price: low to high</option><option value="desc">Price: high to low</option></select></div></div></div>
      {hasFilters && <div className="active-filters"><SlidersHorizontal size={14}/><span>{query && `“${query}” `}{[category,brand,country].filter(Boolean).map(titleCase).join(" · ")}{updated && " · New & updated"}</span><button className="text-button" onClick={reset}>Clear filters <X size={13}/></button></div>}
      {message && <div className="download-message" role="status">{message}<button className="icon-button" aria-label="Dismiss notification" onClick={() => setMessage("")}><X size={16}/></button></div>}
      <section id="products" className="product-groups" aria-label="Product price list">
        {!filtered.length ? <div className="no-results"><Search size={36} strokeWidth={1}/><h2>No drinks found</h2><p>Try a different name or clear your filters.</p><button className="secondary-button" onClick={reset}>Clear filters</button></div> : visibleCategories.map((c, index) => {
          const items = filtered.filter(p => p.category === c); const expanded = hasFilters || sort !== "name" ? !collapsedFiltered.has(c) : open.has(c);
          return <section key={c} className={`product-group ${expanded ? "expanded" : ""}`}><button className="group-heading" aria-expanded={expanded} aria-controls={`group-${c.replaceAll(" ", "-")}`} onClick={() => { if (hasFilters || sort !== "name") setCollapsedFiltered(current => { const next = new Set(current); if (next.has(c)) next.delete(c); else next.add(c); return next; }); else toggleCategory(c); }}><span className="group-number">{String(index + 1).padStart(2,"0")}</span><h2>{titleCase(c)}</h2><span className="group-count">{items.length} {items.length === 1 ? "product" : "products"} <span>· {new Set(items.map(p => p.brand)).size} {new Set(items.map(p => p.brand)).size === 1 ? "brand" : "brands"}</span></span><ChevronDown size={19}/></button>
          {expanded && <div id={`group-${c.replaceAll(" ", "-")}`} className="product-table-wrap"><table className="product-table"><thead><tr><th>ITEM CODE</th><th>PRODUCT / ORIGIN</th><th>PRICE <span>(GHS)</span></th><th><span className="sr-only">Add to cart</span></th></tr></thead><tbody>{items.map(p => <tr key={p.id}><td className="item-code">{p.code}</td><td className="product-name"><div>{p.name}{p.status === "new" && <span className="product-badge">NEW</span>}</div><small>{titleCase(p.brand)}<span>·</span>{titleCase(p.region)}{p.status === "updated" && <span className="updated-label">Updated</span>}</small></td><td className="product-price"><strong>{money(p.price)}</strong>{p.previous_price != null && p.previous_price !== p.price && <del>{money(p.previous_price)}</del>}</td><td><Quantity product={p}/></td></tr>)}</tbody></table></div>}
          </section>;
        })}
      </section>
      <div className="catalogue-note"><span className="tiny-square"/><p>All prices are in Ghana cedis (GHS). This sample catalogue uses the reference product range and pricing. Confirm current prices and availability before ordering.</p></div>
    </main>
    <footer className="catalogue-footer"><Link href="/" className="brand"><Image src="/brand/dwin-logo.png" width={158} height={53} alt="Dwin Distribution"/></Link><span>© 2026 Dwin Distribution</span><span>Please enjoy responsibly.</span></footer>
    {count > 0 && <button className="floating-cart" onClick={() => setCartOpen(true)}><ShoppingBag size={19}/><span>View cart</span><b>{count}</b></button>}
    {cartOpen && <Cart/>}{help && <Modal title="Make it your selection" onClose={() => setHelp(false)}><div className="help-content"><ol><li><strong>Find your favourites</strong><p>Search by product or item code, or narrow the list by collection, category, brand and country.</p></li><li><strong>Build your cart</strong><p>Open a category and tap Add. Use the quantity controls to adjust your selection. Your cart is saved on this device.</p></li><li><strong>Take your list with you</strong><p>Download the filtered price list, or open your cart to create a pro forma invoice with a customer name and catalogue QR code.</p></li></ol><p className="sample-note">This is a sample catalogue. Creating an invoice does not place an order or take a payment.</p><button className="primary-button wide" onClick={() => setHelp(false)}>Got it <Check size={17}/></button></div></Modal>}
  </>;
}
