const fs = require('fs'); const ts = require('typescript'); const assert = require('node:assert/strict'); const cp = require('child_process');
require.extensions['.ts'] = (module,filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true,resolveJsonModule:true}}).outputText,filename);
const baseline=JSON.parse(cp.execFileSync('git',['show','d1ac18e:lib/products.json'],{encoding:'utf8'}));
const overrides=require('../lib/final-price-overrides.json');
const expectedOverrides={'660':650,'663':975.40,'662':3910.60,'823':300,'824':215};
assert.deepEqual(overrides,expectedOverrides,'Only the five confirmed supplier matches may be overridden');
const source=require('../lib/products.json'); const {products,exactAdjustedPrice,bottleSize,money}=require('../lib/catalogue.ts');
assert.deepEqual(source,baseline,'Original source product information changed');
assert.equal(products.length,1459);assert.equal(new Set(products.map(p=>p.id)).size,1459);
for(const old of baseline){const p=products.find(p=>p.id===old.id);assert.ok(p);assert.equal(p.originalPrice,old.price);const final=expectedOverrides[String(old.id)];assert.equal(p.exactPrice,final??old.price*112/100);assert.equal(p.price,final??Math.round(old.price*112/100));assert.ok(Math.abs(p.price-p.exactPrice)<=0.5);for(const k of ['name','code','size','qty','alc','previous_price','updated_at','status'])assert.deepEqual(p[k],old[k],`${old.id} ${k} changed`);}
assert.equal(bottleSize('BOTTLE 12X75CL',null),750);assert.equal(bottleSize('BOTTLE 1.5L','150'),1500);assert.equal(bottleSize('COFFEE 2KGS','2KGS'),null);assert.equal(bottleSize('WINE','75'),null);
const {enquiryMessage}=require('../lib/enquiry.ts');const message=enquiryMessage([{product:products[0],quantity:2}]);assert.ok(message.includes(products[0].name));assert.ok(message.includes('2 ×'));assert.ok(message.includes(String(products[0].code)));
assert.equal(money(975.4),'975.40');assert.equal(money(3910.6),'3,910.60');assert.equal(money(650),'650');
const updated=products.filter(p=>Object.hasOwn(expectedOverrides,p.id));
const supplierMessage=enquiryMessage(updated.map(product=>({product,quantity:2})));
assert.ok(supplierMessage.includes('975.40'));assert.ok(supplierMessage.includes('3,910.60'));
const report={policy:'Supplier final-price overrides for 5 confirmed products; original × 1.12 rounded for all others',supplierOverrideCount:updated.length,unchangedPriceCount:products.length-updated.length,updates:updated.map(p=>({id:p.id,name:p.name,previous:Math.round(p.originalPrice*112/100),final:p.price})),baselineCommit:'d1ac18e',originalCount:baseline.length,finalCount:products.length,verifiedPrices:products.length,preservedSource:true,failures:0,examples:products.slice(0,4).map(p=>({id:p.id,original:p.originalPrice,exact:p.exactPrice,displayed:p.price}))};
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/price-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
