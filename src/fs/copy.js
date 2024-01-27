import { access, mkdir, copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const copy = async () => {
  const pathToCurDir = path.dirname(fileURLToPath(import.meta.url));
  const pathToSourceDir = path.join(pathToCurDir, 'files');
  const pathToTargetDir = path.join(pathToCurDir, 'files-copy');
  const errorMsg = 'FS operation failed';

  try {
    await access(pathToTargetDir);

    throw new Error(errorMsg);
  } catch (err) {
    if (err instanceof Error && err.message === errorMsg) {
      console.error(err);

      return;
    }

    await copyFiles(pathToSourceDir, pathToTargetDir);
  }
};

const copyFiles = async (pathToSourceDir, pathToTargetDir) => {
  try {
    const sourceFiles = await readdir(pathToSourceDir);

    await mkdir(pathToTargetDir);

    for (const fileToCopy of sourceFiles) {
      const pathToSourceFile = path.join(pathToSourceDir, fileToCopy);
      const pathToTargetFile = path.join(pathToTargetDir, fileToCopy);

      if (!!path.extname(pathToSourceFile)) {
        copyFile(pathToSourceFile, pathToTargetFile);
      } else {
        await copyFiles(pathToSourceFile, pathToTargetFile);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

await copy();
