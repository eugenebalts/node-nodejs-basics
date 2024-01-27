import fs, { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rename = async () => {
  const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
  const pathToSourceFile = path.join(
    pathToCurDir,
    'files',
    'wrongFilename.txt'
  );
  const pathToTargetFile = path.join(
    pathToCurDir,
    'files',
    'properFilename.md'
  );
  const errorMsg = 'FS operation failed';

  try {
    await access(pathToTargetFile);

    throw new Error(errorMsg);
  } catch (err) {
    if (err instanceof Error && err.message === errorMsg) {
      console.error(err);

      return;
    }

    try {
      await access(pathToSourceFile);

      await fs.rename(pathToSourceFile, pathToTargetFile);
    } catch (err) {
      throw new Error(errorMsg);
    }
  }
};

await rename();
