import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { stdin } from 'node:process';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathToSourceFile = path.join(__dirname, 'files', 'fileToWrite.txt');

  const writeStream = createWriteStream(pathToSourceFile, 'utf-8');

  stdin.on('data', (data) => {
    writeStream.write(data);
  });

  stdin.on('close', () => {
    writeStream.end();
  });

  writeStream.on('error', (err) => {
    throw new Error(err.message);
  });
};

await write();
