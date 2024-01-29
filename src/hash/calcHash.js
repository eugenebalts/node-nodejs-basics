import path from 'node:path';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToSourceFile = path.join(
  __dirname,
  'files',
  'fileToCalculateHashFor.txt'
);

const calculateHash = async () => {
  try {
    const sourceData = await readFile(pathToSourceFile, 'utf-8');
    const hash = createHash('sha256');
    hash.update(sourceData);
    const hashedData = hash.digest('hex');

    console.log(hashedData);
  } catch (err) {
    throw new Error(err.message);
  }
};

await calculateHash();
