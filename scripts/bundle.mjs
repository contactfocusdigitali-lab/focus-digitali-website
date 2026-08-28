import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';

const projectRoot = new URL('../', import.meta.url);
const animationEntry = new URL('../src/animation-entry.js', import.meta.url).pathname;
const siteScript = new URL('../script.js', import.meta.url);
const outputFile = new URL('../app.js', import.meta.url);

const result = await build({
  entryPoints: [animationEntry],
  bundle: true,
  minify: true,
  format: 'iife',
  legalComments: 'inline',
  write: false,
  absWorkingDir: projectRoot.pathname
});

const animationBundle = result.outputFiles[0].text;
const siteCode = await readFile(siteScript, 'utf8');
await writeFile(outputFile, `${animationBundle}\n${siteCode}`, 'utf8');

console.log('Browser animation bundle created.');
