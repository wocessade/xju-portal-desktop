// Portable rebuild: reads template.html + sites.json -> writes index.html.
// Run from this repo root: node tools/build_desktop.cjs
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const tpl = fs.readFileSync(path.join(root, 'template.html'), 'utf8');
const sites = JSON.parse(fs.readFileSync(path.join(root, 'sites.json'), 'utf8'));
const dataJs = 'const SITES = ' + JSON.stringify(sites, null, 1) + ';';
const out = tpl.replace('/*__DATA__*/ const SITES = [];', dataJs);
if (out === tpl) { console.error('PLACEHOLDER NOT FOUND'); process.exit(1); }
fs.writeFileSync(path.join(root, 'index.html'), out);
console.log('index.html written:', out.length, 'bytes | sites:', sites.length);
