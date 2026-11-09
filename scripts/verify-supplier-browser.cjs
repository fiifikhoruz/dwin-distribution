// Run with Playwright installed, or set PLAYWRIGHT_MODULE to an existing installation.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const additions=require('./fixtures/supplier-additions.json');
const money=n=>n.toLocaleString('en-GH',{minimumFractionDigits:Math.round(n*100)%100===0?0:2,maximumFractionDigits:2});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try {for(const mobile of [false,true]){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},isMobile:mobile,hasTouch:mobile,acceptDownloads:true});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  const base=process.env.BASE_URL||'http://127.0.0.1:3011';
  await page.goto(base+'/list');
  await page.waitForFunction(()=>document.querySelector('.catalogue-toolbar [role="status"]')?.textContent.includes('1,475'));
  for(const p of additions){
   await page.locator('#catalogue-search').fill(p.name);
   const row=page.locator('.price-row').filter({has:page.getByRole('button',{name:`View details for ${p.name}`,exact:true})});
   await row.waitFor();assert.equal(await row.count(),1);
   assert.equal((await row.locator('.price-row-value').innerText()).replace(/\s+/g,' ').trim(),`GHS ${money(p.price)}`);
   assert.equal((await row.locator('.price-row-category').innerText()).toUpperCase(),p.category);
   await row.locator('.add-button').click();
  }
  await page.locator('.order-tray').click();
  assert.equal(await page.locator('.cart-item').count(),16);
  const total=additions.reduce((sum,p)=>sum+p.price,0);
  assert.match(await page.locator('.cart-total').innerText(),new RegExp(money(total).replace(/[.,]/g,'\\$&')));
  await page.getByRole('button',{name:'Request a quote',exact:true}).click();
  await page.getByText('Preview your enquiry',{exact:true}).click();
  const message=await page.getByLabel('Generated enquiry message').inputValue();
  for(const p of additions)assert.ok(message.includes(`1 × ${p.name} — GHS ${money(p.price)} each`));
  assert.ok(!message.includes('null')&&!message.includes('undefined'));
  await page.getByRole('button',{name:'Close dialog'}).click();
  // Verify every new item is reachable through its category URL.
  for(const category of ['WHISKY','GIN','LIQUEUR','WINE']){
   const group=category==='WINE'?'wines':'spirits';
   await page.goto(`${base}/list?collection=${group}`);
   await page.locator(`.subcategory-grid a[href*="category=${category}"]`).click();
   for(const p of additions.filter(p=>p.category===category)){
    await page.locator('#catalogue-search').fill(p.name);
    await page.getByRole('button',{name:`View details for ${p.name}`,exact:true}).waitFor();
    assert.equal(await page.locator('.price-row').count(),1);
   }
  }
  // Original size variants and the previously updated five products.
  await page.goto(base+'/list');
  for(const [code,price]of [['620671','643'],['592228','1,921'],['592752','650'],['593224','975.40'],['592229','3,910.60'],['592126','300'],['592210','215']]){
   await page.locator('#catalogue-search').fill(code);
   await page.waitForFunction(price=>document.querySelector('.price-row-value')?.textContent.trim()==='GHS '+price,price);
   assert.equal(await page.locator('.price-row').count(),1);
  }
  await page.locator('#catalogue-search').fill('');
  if(mobile)await page.getByRole('button',{name:/^Filters/}).click();
  const prefix=mobile?'mobile':'desktop';
  await page.locator(`#${prefix}-brand`).selectOption("HENDRICK'S GIN");
  await page.locator(`#${prefix}-size`).selectOption('unknown');
  if(mobile)await page.getByRole('button',{name:/^Show .* products/}).click();
  await page.waitForFunction(()=>document.querySelectorAll('.price-row').length===1);
  assert.equal(await page.locator('.price-name').innerText(),'HENDRICKS GIN');
  await page.locator('.price-name').click();
  assert.ok(!(await page.locator('.product-modal').innerText()).includes('Product code'));
  assert.ok((await page.locator('.product-modal').innerText()).includes('Size on enquiry'));
  await page.getByRole('button',{name:'Close dialog'}).click();
  assert.deepEqual(errors,[]);
  console.log(`${mobile?'MOBILE':'DESKTOP'} PASS: all 16 searches/prices/categories; 16-item enquiry/total; original variants and 5 previous prices; brand/size filters; no console errors.`);
  await context.close();
 }}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
