import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const dist = join(root, 'dist');
const assetsSource = join(dist, 'assets');
const assetsTarget = join(root, 'assets');

if (!existsSync(dist)) {
  throw new Error('dist directory was not created by vite build');
}

copyFileSync(join(dist, 'index.html'), join(root, 'index.html'));

if (existsSync(assetsTarget)) {
  rmSync(assetsTarget, { recursive: true, force: true });
}

if (existsSync(assetsSource)) {
  mkdirSync(assetsTarget, { recursive: true });
  cpSync(assetsSource, assetsTarget, { recursive: true });
}

console.log('Synced dist/index.html and dist/assets/* back to project root.');
