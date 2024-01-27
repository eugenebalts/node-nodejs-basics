import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';

const list = async () => {
  const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
  const pathToSourceDir = path.join(pathToCurDir, 'files');
  const errorMsg = 'FS operation failed';

  try {
    const files = await readdir(pathToSourceDir);

    files.forEach((file) => {
      console.log(path.basename(file));
    });
  } catch (err) {
    throw new Error(errorMsg);
  }
};

await list();
