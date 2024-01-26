import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'path';

const create = async () => {
  const endpoint = path.resolve('src', 'fs', 'files', 'fresh.txt');
  const errorMsg = 'FS operation failed';

  try {
    await readFile(endpoint, 'utf8');

    throw new Error(errorMsg);
  } catch (err) {
    if (err instanceof Error && err.message === errorMsg) {
      console.error(err);
    }

    try {
      await mkdir(path.dirname(endpoint), { recursive: true });

      await writeFile(path.dirname(endpoint), 'I am fresh and young', 'utf8');
    } catch (error) {
      console.error(error.message);
    }
  }
};

await create();
