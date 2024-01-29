import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
const pathToSourceFile = path.join(pathToCurDir, 'files', 'fileToRead.txt');

const read = async () => {
  try {
    const fileContent = await readFile(pathToSourceFile, 'utf-8');

    console.log(fileContent);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await read();
