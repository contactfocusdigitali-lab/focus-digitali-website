import { cpSync, copyFileSync, mkdirSync, rmSync } from 'node:fs';

const output = new URL('../dist/', import.meta.url);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of ['index.html', 'styles.css', 'app.js', 'logo.jpg']) {
  copyFileSync(new URL(`../${file}`, import.meta.url), new URL(file, output));
}

cpSync(new URL('../assets/', import.meta.url), new URL('assets/', output), {
  recursive: true
});

console.log('Static production build created in dist/.');
