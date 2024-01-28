import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';

const transform = async () => {
  const reverse = new Transform({
    transform(chunk, _, callback) {
      const reversedChunk = `${chunk.reverse()}\n`;

      this.push(reversedChunk);

      callback();
    },
  });

  stdin.pipe(reverse).pipe(stdout);
};

await transform();
