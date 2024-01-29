import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToSourceFile = path.join(__dirname, 'files', 'fileToCompress.txt');
const pathToDestination = path.join(__dirname, 'files', 'archive.txt.gz');

const compress = async () => {
  try {
    await pipeline(
      createReadStream(pathToSourceFile),
      createGzip(),
      createWriteStream(pathToDestination)
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

await compress();
