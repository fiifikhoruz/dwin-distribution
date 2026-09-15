import data from "./products.json";
import imageData from "./product-images.json";

// products.json is the immutable pre-increase baseline. Never multiply an already adjusted price.
export const PRICE_MULTIPLIER = 1.12;
export const PRICE_POLICY = "2026-09-15-plus-12-percent";
export const adjustedPrice = (original: number) => Math.round(original * 112 / 100);
export const exactAdjustedPrice = (original: number) => original * 112 / 100;
export const money = (value: number) => value.toLocaleString("en-GH", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
export const titleCase = (value: string) => value.toLowerCase().replace(/(^|[\s-])\S/g, c => c.toUpperCase());
export const collections: Record<string, string[]> = {
  spirits: ["BITTERS", "BRANDY", "COGNAC", "CREAM LIQUEUR", "GIN", "LIQUEUR", "OTHER SPIRITS", "RTD", "RUM", "TEQUILA", "VERMOUTH", "VODKA", "WHISKY"],
  wines: ["WINE", "CHAMPAGNE", "PROSECCO", "SPARKLING WINE"],
  "non-alcoholic": ["NON ALCOHOLIC", "COCKTAIL FLAVORS", "COFFEE", "DAIRY", "TEA", "MACHINES"]
};
export const occasions: Record<string, { name: string; copy: string; categories: string[] }> = {
  home: { name: "Home & celebrations", copy: "A dinner shared. A milestone marked. A bottle worth opening.", categories: ["WINE", "CHAMPAGNE", "PROSECCO", "SPARKLING WINE", "COGNAC"] },
  hospitality: { name: "Bars & restaurants", copy: "Build a back bar and a drinks list your guests will come back for.", categories: ["WHISKY", "VODKA", "GIN", "RUM", "TEQUILA", "COCKTAIL FLAVORS", "BITTERS", "LIQUEUR"] },
  events: { name: "Events & corporate orders", copy: "Bring the whole drinks selection together, from the first toast to the final pour.", categories: ["CHAMPAGNE", "WINE", "SPARKLING WINE", "NON ALCOHOLIC", "VODKA", "WHISKY"] }
};
export function bottleSize(name: string, raw: string | null): number | null {
  const parse = (text: string) => { const matches = [...text.toUpperCase().matchAll(/(\d+(?:\.\d+)?)\s*(ML|CL|LITRES?|LITERS?|LTRS?|LT|L)\b/g)]; const match = matches.at(-1); return match ? Math.round(Number(match[1]) * (match[2] === "ML" ? 1 : match[2] === "CL" ? 10 : 1000)) : null; };
  // Bare source values such as "75" have no explicit unit; retain them without guessing.
  return parse(name) ?? parse(raw || "");
}
export function sizeLabel(ml: number | null) { return ml === null ? "Size on enquiry" : ml >= 1000 ? `${ml / 1000} L` : `${ml} ml`; }
const images = imageData as Record<string, { src: string; source: string; note?: string }>;
export const featuredIds = [693, 1082, 690, 102, 827];
export const products = data.map(p => ({ ...p,
  category: p.category.trim(), brand: p.brand.trim(), region: (p.region || "Not specified").trim(),
  originalPrice: Number(p.price), exactPrice: exactAdjustedPrice(Number(p.price)), price: adjustedPrice(Number(p.price)),
  bottleMl: bottleSize(p.name, p.size), image: images[String(p.id)]?.src ?? null,
  imageNote: images[String(p.id)]?.note ?? "", featuredRank: featuredIds.includes(p.id) ? featuredIds.indexOf(p.id) : 10000 + p.id
}));
export type Product = typeof products[number];
export const categories = [...new Set(products.map(p => p.category))].sort();
export const brands = [...new Set(products.map(p => p.brand))].sort();
export const countries = [...new Set(products.map(p => p.region))].sort();
export const sizes = [...new Set(products.map(p => p.bottleMl).filter((size): size is number => size !== null))].sort((a,b) => a-b);
export const featuredProducts = [...products].filter(p => p.image).sort((a,b) => a.featuredRank-b.featuredRank).slice(0,8);
