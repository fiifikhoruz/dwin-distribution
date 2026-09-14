import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
const sections = [
  { key: "spirits", number: "01", name: "Spirits", types: "WHISKY · VODKA · GIN · RUM", description: "From aged single malts to fine cognacs. Discover a spirit for every occasion.", image: "spirits" },
  { key: "wines", number: "02", name: "Wines &\nChampagnes", types: "RED · WHITE · ROSÉ · SPARKLING", description: "Everyday favourites and exceptional vintages, ready for your next celebration.", image: "wines" },
  { key: "non-alcoholic", number: "03", name: "Non-alcoholic", types: "JUICES · WATER · SOFT DRINKS", description: "Refreshing classics, premium mixers and a world of flavour, without the alcohol.", image: "non-alcoholic" }
];
export default function Home() {
  return <main className="home"><Header home/>
    <div className="home-intro"><span>THE DWIN COLLECTION</span><span>Good taste. Great company.</span></div>
    <section className="collection-grid" aria-label="Browse our drinks collections">
      {sections.map(section => <Link href={`/list?collection=${section.key}`} className={`collection-card collection-${section.key}`} key={section.key}>
        <Image className="collection-photo" src={`/images/${section.image}.png`} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" priority/>
        <div className="photo-shade"/>
        <div className="collection-top"><span>{section.number} / COLLECTION</span><ArrowUpRight size={23}/></div>
        <div className="collection-content"><div className="gold-rule"/><p className="eyebrow">{section.types}</p><h1>{section.name.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h1><p className="collection-description">{section.description}</p><span className="browse-link">Browse collection <ArrowRight size={18}/></span></div>
      </Link>)}
    </section>
    <Link href="/list" className="full-catalogue"><span><span className="tiny-square"/> YOUR NEXT GREAT POUR STARTS HERE</span><strong>View full price list <ArrowRight size={20}/></strong><span>1,459 PRODUCTS <ArrowDown size={15}/></span></Link>
    <footer className="home-footer"><span>© 2026 Dwin Distribution</span><span>Sample catalogue · Prices in Ghana cedis (GHS)</span><span>Please enjoy responsibly.</span></footer>
  </main>;
}
