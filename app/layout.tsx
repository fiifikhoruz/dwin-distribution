import type { Metadata } from "next";
import { StoreProvider } from "@/components/store";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Dwin Distribution | Drinks Price List 2026", template: "%s | Dwin Distribution" },
  description: "Explore the Dwin Distribution sample drinks catalogue. Browse spirits, wines, champagne and non-alcoholic drinks, build a cart and download a quotation.",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><StoreProvider>{children}</StoreProvider></body></html>;
}
