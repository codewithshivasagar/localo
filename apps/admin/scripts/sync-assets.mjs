import { cp, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const adminRoot = resolve(scriptDir, '..');
const workspaceRoot = resolve(adminRoot, '../..');
const source = resolve(workspaceRoot, 'packages/assets/public/localo');
const destination = resolve(adminRoot, 'public/assets/localo');

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
