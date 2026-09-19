const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process'),sharp=require('sharp');
const products=require('../lib/products.json'),images=require('../lib/product-images.json'),sources=require('../docs/product-image-sources.json');
(async()=>{
 const baseline=JSON.parse(execFileSync('git',['show','e5d31ff:lib/products.json'],{encoding:'utf8'}));
 assert.equal(products.length,1459);assert.deepEqual(products,baseline,'Product data or original prices changed');
 const oldImages=JSON.parse(execFileSync('git',['show','e5d31ff:lib/product-images.json'],{encoding:'utf8'}));
 for(const [id,image]of Object.entries(oldImages))assert.deepEqual(images[id],image,'Existing image replaced');
 const hashes=new Map();
 for(const [id,img]of Object.entries(images)){
  const p=products.find(p=>p.id===Number(id));assert(p,'Unknown mapped product');
  assert(img.src.startsWith('/products/')&&!img.src.includes('..'),'Unsafe local image path');
  const file='public'+img.src;assert(fs.existsSync(file),'Missing '+file);
  const meta=await sharp(file).metadata();assert(meta.width>0&&meta.height>0);
  await sharp(file).raw().toBuffer(); // Full decoder run, not just header validation.
  const records=sources.filter(x=>x.productId===p.id);assert.equal(records.length,1,'Missing/duplicate source record '+id);
  assert.equal(records[0].imageFilename,img.src);assert.equal(records[0].productName,p.name);
  const hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if(hashes.has(hash))throw Error('Duplicate image bytes require explicit identity review: '+hashes.get(hash)+' and '+id);
  hashes.set(hash,id);
  if(records[0].sha256)assert.equal(records[0].sha256,hash);
 }
 const report={checkedAt:new Date().toISOString(),productCount:products.length,productDataUnchanged:true,pricesUnchanged:true,existingImagesPreserved:Object.keys(oldImages).length,totalImages:Object.keys(images).length,newImages:Object.keys(images).length-Object.keys(oldImages).length,missingPaths:0,decodeErrors:0,duplicateImageHashes:0};
 fs.writeFileSync('docs/product-image-verification.json',JSON.stringify(report,null,2)+'\n');console.log(report);
})().catch(e=>{console.error(e);process.exit(1)});
