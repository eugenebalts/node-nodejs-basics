import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stdout } from 'node:process';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathToSourceFile = path.join(__dirname, 'files', 'fileToRead.txt');

  const readSteam = createReadStream(pathToSourceFile, 'utf-8');

  readSteam.on('data', (chunk) => {
    stdout.write(chunk);
  });

  readSteam.on('error', (err) => {
    throw new Error(err.message);
  });
};

await read();
