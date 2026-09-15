import type { Metadata } from "next";
import { StoreProvider } from "@/components/store";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { OrderShell } from "@/components/order-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://dwin-distribution.vercel.app"),
  openGraph: { type: "website", siteName: "Dwin Distribution", title: "Dwin Distribution — Premium drinks, supplied properly.", description: "Wines, spirits and refreshments for your home, business and next occasion." },
  title: { default: "Dwin Distribution | Premium drinks, supplied properly.", template: "%s | Dwin Distribution" },
  description: "Discover wines, premium spirits and non-alcoholic drinks for your home, hospitality business and events. Build an order with Dwin Distribution in Ghana.",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><StoreProvider><a className="skip-link" href="#main-content">Skip to content</a><Header/>{children}<Footer/><OrderShell/></StoreProvider></body></html>;
}
