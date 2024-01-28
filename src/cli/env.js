import { env } from 'node:process';

const parseEnv = () => {
  const envRssVars = Object.entries(env).filter(([key]) =>
    key.startsWith('RSS_')
  );

  const result = envRssVars.map(([key, value]) => `${key}=${value}`).join('; ');

  console.log(result);
};

parseEnv();
