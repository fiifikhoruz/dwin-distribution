import { Suspense } from "react";
import { Catalogue } from "@/components/catalogue";
export const metadata = { title: "Explore the collection", description: "Browse all Dwin Distribution products. Filter drinks by category, brand, bottle size and price, then build your order and request a quote." };
export default function ListPage() { return <Suspense fallback={<main className="loading">Preparing your catalogue…</main>}><Catalogue/></Suspense>; }
