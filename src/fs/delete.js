import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';

const remove = async () => {
  const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
  const pathToSourceFile = path.join(pathToCurDir, 'files', 'fileToRemove.txt');
  const errorMsg = 'FS operation failed';

  try {
    await rm(pathToSourceFile);
  } catch (err) {
    throw new Error(errorMsg);
  }
};

await remove();
