import path from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import './files/c.js';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

const random = Math.random();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parseJsonFile = async (path) => {
  try {
    const res = await readFile(path, 'utf8');

    return JSON.parse(res);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const unknownObject =
  random > 0.5
    ? await parseJsonFile(path.join(__dirname, './files/a.json'))
    : await parseJsonFile(path.join(__dirname, './files/b.json'));

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

export const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});
