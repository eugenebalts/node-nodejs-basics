import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToWorker = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
  const cores = cpus().length;

  const createWorker = (workerIndex) => {
    return new Promise((res, rej) => {
      const worker = new Worker(pathToWorker, {
        workerData: 10 + workerIndex,
      });

      worker.on('message', (data) => {
        res(data);
      });

      worker.on('error', (error) => {
        rej(error);
      });
    });
  };

  const workerPromises = [];

  for (let i = 0; i < cores; i++) {
    workerPromises.push(createWorker(i));
  }

  try {
    const results = await Promise.all(workerPromises);

    console.log(results);
  } catch (err) {
    throw new Error(err.message);
  }
};

await performCalculations();
