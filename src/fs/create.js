import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';

const create = async () => {
  const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
  const targetDir = path.join(pathToCurDir, 'files');
  const filePath = path.join(targetDir, 'fresh.txt');
  const errorMsg = 'FS operation failed';

  try {
    await readFile(filePath, 'utf8');

    throw new Error(errorMsg);
  } catch (err) {
    if (err instanceof Error && err.message === errorMsg) {
      console.error(err);

      return;
    }

    try {
      await mkdir(targetDir, { recursive: true });

      await writeFile(filePath, 'I am fresh and young', 'utf8');
    } catch (error) {
      console.error(error.message);
    }
  }
};

await create();
