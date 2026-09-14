import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { money, type Product } from "./catalogue";

const safeText = (value: string) => value.replace(/[^\x20-\x7E\xA0-\xFF]/g, "-");
async function documentHeader(doc: jsPDF, title: string) {
  doc.setFillColor(22, 25, 22); doc.rect(0, 0, 210, 40, "F");
  try {
    const blob = await (await fetch("/brand/dwin-logo.png")).blob();
    const image = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result as string); reader.onerror = reject; reader.readAsDataURL(blob); });
    doc.addImage(image, "PNG", 13, 9, 62, 21);
  } catch { doc.setTextColor(198,166,109); doc.setFontSize(19); doc.text("DWIN DISTRIBUTION", 14, 25); }
  doc.setTextColor(255,255,255); doc.setFontSize(14); doc.text(title, 196, 19, { align: "right" });
  doc.setFontSize(9); doc.text(new Date().toLocaleDateString("en-GB"), 196, 27, { align: "right" });
  doc.setTextColor(40,40,40);
}
function footer(doc: jsPDF) {
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page); doc.setTextColor(110); doc.setFontSize(8);
    doc.text("Dwin Distribution | Sample pricing in GHS. Subject to confirmation.", 14, 286);
    doc.text(`${page} / ${pages}`, 196, 286, { align: "right" });
  }
}
export async function downloadPriceList(items: Product[]) {
  const doc = new jsPDF(); await documentHeader(doc, "DRINKS PRICE LIST 2026");
  doc.setFontSize(10); doc.text(`${items.length} products | Sample catalogue`, 14, 49);
  autoTable(doc, { startY: 55, head: [["Code", "Product", "Category", "Price (GHS)"]],
    body: items.map(p => [p.code, safeText(p.name), p.category, money(p.price)]),
    styles: { fontSize: 8, cellPadding: 3 }, headStyles: { fillColor: [52,58,49] },
    alternateRowStyles: { fillColor: [248,247,243] }, columnStyles: { 3: { halign: "right" } }, margin: { bottom: 20 }
  }); footer(doc); doc.save("Dwin-Distribution-Price-List-2026.pdf");
}
export async function downloadInvoice(items: { product: Product; quantity: number }[], customer: string, reference: string) {
  const doc = new jsPDF(); await documentHeader(doc, "PRO FORMA INVOICE");
  doc.setFontSize(10); doc.text(`Customer: ${safeText(customer)}`, 14, 49, { maxWidth: 145 });
  doc.text(`Reference: ${reference}`, 14, 64);
  const qr = await QRCode.toDataURL(`${window.location.origin}/list`, { margin: 1, width: 180, errorCorrectionLevel: "M" });
  doc.addImage(qr, "PNG", 168, 44, 27, 27);
  autoTable(doc, { startY: 77, head: [["Code", "Description", "Qty", "Unit (GHS)", "Total (GHS)"]],
    body: items.map(({product: p, quantity}) => [p.code, safeText(p.name), quantity, money(p.price), money(p.price * quantity)]),
    foot: [["", "TOTAL (GHS)", "", "", money(items.reduce((sum, item) => sum + item.product.price * item.quantity, 0))]],
    styles: { fontSize: 9, cellPadding: 3.5 }, headStyles: { fillColor: [52,58,49] }, footStyles: { fillColor: [52,58,49] },
    columnStyles: { 2: { halign: "center" }, 3: { halign: "right" }, 4: { halign: "right" } }, margin: { bottom: 34 }
  });
  doc.setFontSize(9); doc.setTextColor(100); doc.text("Sample quotation only. This is not a tax invoice or confirmation of an order.", 14, 271);
  doc.text("Availability, delivery charges and applicable taxes require confirmation.", 14, 276);
  footer(doc); doc.save(`${reference}.pdf`);
}
