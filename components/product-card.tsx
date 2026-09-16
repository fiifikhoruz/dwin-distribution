"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { money, sizeLabel, titleCase, type Product } from "@/lib/catalogue";
import { Modal } from "./modal";
import { Quantity } from "./cart";
export { CategoryVisual as BottleIllustration } from "./category-visual";
import { CategoryVisual } from "./category-visual";
export function ProductVisual({product}:{product:Product}){
 const [failed,setFailed]=useState(false);
 return product.image&&!failed?<Image src={product.image} alt={titleCase(product.name)} fill sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 25vw" className="packshot" onError={()=>setFailed(true)}/>:<><CategoryVisual category={product.category} name={product.name}/>{failed&&<span className="image-caption">Category illustration · photo unavailable</span>}</>;
}
export function ProductCard({product}:{product:Product}){
 const [detail,setDetail]=useState(false);
 return <><article className="product-card"><button className="product-image" onClick={()=>setDetail(true)} aria-label={`View ${product.name}`}><ProductVisual product={product}/>{!product.image&&<span className="image-caption">Category illustration</span>}<span className="inspect-product"><ArrowUpRight size={17}/></span></button><div className="product-card-content"><div className="product-category">{titleCase(product.category)} <span>{sizeLabel(product.bottleMl)}</span></div><button className="product-title" onClick={()=>setDetail(true)}>{titleCase(product.name)}</button><p className="product-origin">{titleCase(product.region)}</p><div className="product-card-bottom"><strong><small>GHS</small> {money(product.price)}</strong><Quantity product={product}/></div></div></article>{detail&&<Modal title="The details" className="product-modal" onClose={()=>setDetail(false)}><div className="product-detail"><div className="detail-image"><ProductVisual product={product}/>{!product.image&&<span className="image-caption">Category illustration, not product photography</span>}</div><div><p className="eyebrow">{titleCase(product.category)}</p><h2>{titleCase(product.name)}</h2><strong className="detail-price">GHS {money(product.price)}</strong><dl><div><dt>Brand</dt><dd>{titleCase(product.brand)}</dd></div><div><dt>Country / region</dt><dd>{titleCase(product.region)}</dd></div><div><dt>Bottle size</dt><dd>{sizeLabel(product.bottleMl)}</dd></div>{product.size&&<div><dt>Original size field</dt><dd>{product.size}</dd></div>}{product.qty&&<div><dt>Pack quantity (source)</dt><dd>{product.qty}</dd></div>}{product.alc!==null&&product.alc>0&&<div><dt>Alcohol</dt><dd>{product.alc}%</dd></div>}<div><dt>Product code</dt><dd>{product.code}</dd></div>{product.status&&<div><dt>Catalogue update</dt><dd>{titleCase(product.status)}</dd></div>}</dl><p className="fine-print">Availability and pack configuration confirmed with your quote. {product.imageNote}</p><Quantity product={product}/></div></div></Modal>}</>;
}
