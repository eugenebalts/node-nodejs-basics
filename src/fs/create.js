import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';

const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
const targetDir = path.join(pathToCurDir, 'files');
const filePath = path.join(targetDir, 'fresh.txt');
const ERROR_MSG = 'FS operation failed';

const create = async () => {
  try {
    await readFile(filePath, 'utf8');

    throw new Error(ERROR_MSG);
  } catch (err) {
    if (err instanceof Error && err.message === ERROR_MSG) {
      throw new Error(ERROR_MSG);
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
