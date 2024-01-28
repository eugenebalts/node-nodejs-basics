import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';

const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
const pathToSourceDir = path.join(pathToCurDir, 'files');
const ERROR_MSG = 'FS operation failed';

const list = async () => {
  try {
    const files = await readdir(pathToSourceDir);

    files.forEach((file) => {
      console.log(path.basename(file));
    });
  } catch (err) {
    throw new Error(ERROR_MSG);
  }
};

await list();
