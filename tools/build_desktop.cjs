// Portable rebuild: reads template.html + sites.json -> writes index.html.
// Run from this repo root: node tools/build_desktop.cjs
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const ug = process.argv.includes('--ug');
const title = ug ? '新大本科生办事大厅 · 转接桌面' : '新大研究生办事大厅 · 转接桌面';
const sitesFile = ug ? 'sites-ug.json' : 'sites.json';
const outFile = path.join(root, ug ? 'undergrad' : '', 'index.html');
const tpl = fs.readFileSync(path.join(root, 'template.html'), 'utf8').split('__PAGE_TITLE__').join(title);
const sites = JSON.parse(fs.readFileSync(path.join(root, sitesFile), 'utf8'));
const dataJs = 'const SITES = ' + JSON.stringify(sites, null, 1) + ';';
const out = tpl.replace('/*__DATA__*/ const SITES = [];', dataJs);
if (out === tpl) { console.error('PLACEHOLDER NOT FOUND'); process.exit(1); }
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, out);
console.log('index.html written:', out.length, 'bytes | sites:', sites.length);
