import { money, type Product } from "./catalogue";
// Set to Dwin's confirmed international WhatsApp number, digits only, e.g. 233...
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_DWIN_WHATSAPP_NUMBER || "";
export function enquiryMessage(items: { product: Product; quantity: number }[], customer = "", note = "") {
  return ["Hello Dwin Distribution, I would like a quote for:", "", ...items.map(({product,quantity}) => `${quantity} × ${product.name} (code ${product.code}) — GHS ${money(product.price)} each`), "", `Estimated total: GHS ${money(items.reduce((sum,item) => sum + item.product.price * item.quantity,0))}`, customer.trim() ? `Name / business: ${customer.trim()}` : "", note.trim() ? `Notes: ${note.trim()}` : "", "Please confirm availability, pack quantities, delivery and the final quotation."].filter(line => line !== "").join("\n");
}
export function whatsappUrl(message: string) { return WHATSAPP_NUMBER && /^\d{8,15}$/.test(WHATSAPP_NUMBER) ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`; }
