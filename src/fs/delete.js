import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';

const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
const pathToSourceFile = path.join(pathToCurDir, 'files', 'fileToRemove.txt');
const ERROR_MSG = 'FS operation failed';

const remove = async () => {
  try {
    await rm(pathToSourceFile);
  } catch (err) {
    throw new Error(ERROR_MSG);
  }
};

await remove();
