// Copia Decap CMS da node_modules dentro public/admin/vendor.
// Così il pannello /admin non carica nulla da CDN esterne (unpkg, jsdelivr):
// meno dipendenze da terzi e nessun IP degli editor inviato fuori.
import { cpSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const src = 'node_modules/decap-cms/dist';
const dest = 'public/admin/vendor';

if (!existsSync(src)) {
  console.warn('[copy-decap] decap-cms non trovato, salto la copia.');
  process.exit(0);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

let n = 0;
for (const file of readdirSync(src)) {
  // Servono decap-cms.js e i suoi chunk (*.decap-cms.js). Niente source map.
  if (file === 'decap-cms.js' || file.endsWith('.decap-cms.js')) {
    cpSync(join(src, file), join(dest, file));
    n++;
  }
}
console.log(`[copy-decap] copiati ${n} file in ${dest}`);
