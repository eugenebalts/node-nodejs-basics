import fs, { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
const pathToSourceFile = path.join(pathToCurDir, 'files', 'wrongFilename.txt');
const pathToTargetFile = path.join(pathToCurDir, 'files', 'properFilename.md');
const ERROR_MSG = 'FS operation failed';

const rename = async () => {
  try {
    await access(pathToTargetFile);

    throw new Error(ERROR_MSG);
  } catch (err) {
    if (err instanceof Error && err.message === ERROR_MSG) {
      throw new Error(ERROR_MSG);
    }

    try {
      await access(pathToSourceFile);

      await fs.rename(pathToSourceFile, pathToTargetFile);
    } catch (err) {
      throw new Error(ERROR_MSG);
    }
  }
};

await rename();
