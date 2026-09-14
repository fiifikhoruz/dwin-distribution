import { Suspense } from "react";
import { Catalogue } from "@/components/catalogue";
export const metadata = { title: "Price List 2026" };
export default function ListPage() { return <Suspense fallback={<main className="loading">Preparing your catalogue…</main>}><Catalogue/></Suspense>; }
