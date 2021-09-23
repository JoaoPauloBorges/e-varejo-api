import * as dotenv from 'dotenv';

export function bootstrapEnvironmentVariables() {
  let path = '.env';
  if (process.env.NODE_ENV === 'test') {
    path = '.env.test';
  }
  const { parsed } = dotenv.config({ path });
  for (const key in parsed) process.env[key] = parsed[key];
  console.log(`Iniciado em ambiente ${process.env.NODE_ENV ?? 'development'} - arquivo ${path}`);
}
