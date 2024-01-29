import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'node:child_process';
import { stdin, stdout } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToScript = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', [pathToScript, ...args]);

  stdin.on('data', (data) => {
    childProcess.stdin.write(data);
  });

  childProcess.stdout.on('data', (data) => {
    stdout.write(data);
  });
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);
