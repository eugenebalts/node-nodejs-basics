const parseArgs = () => {
  const processArgs = process.argv.slice(2);

  console.log(
    processArgs
      .reduce((acc, cur, index) => {
        const newString = index % 2 === 0 ? `${cur.slice(2)} is ` : `${cur}, `;

        return acc + newString;
      }, '')
      .trim()
      .slice(0, -1)
  );
};

parseArgs();
