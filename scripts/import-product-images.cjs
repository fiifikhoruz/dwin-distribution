/* Only explicitly reviewed candidates can enter the catalogue. Never replaces existing mappings. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
const products = require('../lib/products.json');
const inventory = require('../docs/product-image-inventory.json').products;
const candidates = require('../docs/product-image-candidates.json');
const mapping = require('../lib/product-images.json');
const staging = process.argv[2];
if (!staging) throw Error('Pass the folder containing downloaded candidate files named by product ID.');
const recordPath = 'docs/product-image-sources.json';
const records = fs.existsSync(recordPath) ? JSON.parse(fs.readFileSync(recordPath)) : Object.entries(mapping).map(([id, image]) => ({productId: Number(id), productName: products.find(p => p.id === Number(id)).name, imageFilename: image.src, sourceUrl: image.source, sourceType: 'retailer', verificationConfidence: 'previously-verified', dateSourced: null, evidence: 'Existing verified image preserved; original sourcing date was not recorded.'}));
const slug = s => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
(async () => {
 for (const c of candidates) {
  if (!c.reviewed || c.verificationConfidence !== 'high' || c.rejectionReason || mapping[c.productId]) continue;
  const p = products.find(p => p.id === c.productId);
  if (!p) throw Error('Unknown product '+c.productId);
  const input = path.join(staging, String(p.id));
  const source = await sharp(input).metadata();
  if (!source.width || !source.height || Math.max(source.width, source.height) < 400) throw Error('Insufficient image dimensions '+p.id);
  const base = slug(p.name) + (p.size && !/\b\d+\s*(?:cl|ml|l|liter|litre)\b/i.test(p.name) ? '-'+slug(p.size)+'cl' : '');
  const file = '/products/'+inventory.find(x=>x.id===p.id).group+'/'+base+'.webp';
  if (Object.values(mapping).some(x=>x.src===file)) throw Error('Filename collision '+file);
  fs.mkdirSync(path.dirname('public'+file), {recursive:true});
  await sharp(input).rotate().resize({width:1000,height:1200,fit:'inside',withoutEnlargement:true}).webp({quality:90}).toFile('public'+file);
  const info = await sharp('public'+file).metadata();
  const sha256 = crypto.createHash('sha256').update(fs.readFileSync('public'+file)).digest('hex');
  mapping[p.id] = {src:file,source:c.sourceUrl,note:'Verified product photography; packaging may vary.'};
  records.push({productId:p.id,productName:p.name,imageFilename:file,sourceUrl:c.sourceUrl,sourceImageUrl:c.imageUrl,sourceType:c.sourceType,verificationConfidence:c.verificationConfidence,dateSourced:new Date().toISOString().slice(0,10),evidence:c.evidence,width:info.width,height:info.height,sha256});
  console.log('Added',p.id,p.name);
 }
 fs.writeFileSync('lib/product-images.json',JSON.stringify(mapping,null,2)+'\n');
 fs.writeFileSync(recordPath,JSON.stringify(records,null,2)+'\n');
})().catch(e=>{console.error(e);process.exit(1)});
