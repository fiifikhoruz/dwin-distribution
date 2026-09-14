import data from "./products.json";
export type Product = { id: number; category: string; region: string; brand: string; code: string; name: string; price: number; status: string | null; previous_price: number | null };
export const products: Product[] = data.map(p => ({ ...p, category: p.category.trim(), brand: p.brand.trim(), region: (p.region || "Not specified").trim(), price: Number(p.price) }));
export const categories = [...new Set(products.map(p => p.category))].sort();
export const brands = [...new Set(products.map(p => p.brand))].sort();
export const countries = [...new Set(products.map(p => p.region))].sort();
export const money = (value: number) => value.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const titleCase = (value: string) => value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
export const collections: Record<string, string[]> = {
  spirits: ["BITTERS", "BRANDY", "COGNAC", "CREAM LIQUEUR", "GIN", "LIQUEUR", "OTHER SPIRITS", "RTD", "RUM", "TEQUILA", "VERMOUTH", "VODKA", "WHISKY"],
  wines: ["WINE", "CHAMPAGNE", "PROSECCO", "SPARKLING WINE"],
  "non-alcoholic": ["NON ALCOHOLIC", "COCKTAIL FLAVORS", "COFFEE", "DAIRY", "TEA", "MACHINES"]
};
