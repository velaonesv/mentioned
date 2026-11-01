// Renders the table rows into index.html statically (run: node build.js)
const fs=require('fs');
global.TOOLS=null;eval(fs.readFileSync(__dirname+'/data.js','utf8').replace(/const TOOLS/,'global.TOOLS'));
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const rows=[...TOOLS].sort((a,b)=>a.name.localeCompare(b.name)).map(t=>`<tr><td><a href="${e(t.url)}" target="_blank" rel="noopener">${e(t.name)}</a></td><td>${e(t.price)}</td><td>${e(t.engines)}</td><td class="src">${e(t.checked)}<br><a href="${e(t.source)}" target="_blank" rel="noopener">${new URL(t.source).hostname}</a></td></tr>`).join('');
let h=fs.readFileSync(__dirname+'/index.html','utf8');
h=h.replace(/<!--ROWS-->[\s\S]*?<!--\/ROWS-->/,'<!--ROWS-->'+rows+'<!--/ROWS-->');
fs.writeFileSync(__dirname+'/index.html',h);
const last=new Date().toISOString().slice(0,10);
fs.writeFileSync(__dirname+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://mentionedprices.com/</loc><lastmod>${last}</lastmod><changefreq>weekly</changefreq></url></urlset>\n`);
console.log('rows',TOOLS.length,'lastmod',last);
