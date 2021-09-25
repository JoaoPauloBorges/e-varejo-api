import * as dotenv from 'dotenv';

export function bootstrapEnvironmentVariables() {
  let path = '.env';
  if (process.env.NODE_ENV === 'test') {
    path = '.env.test';
  } else if (process.env.NODE_ENV === 'production') {
    path = '.env.production';
  }
  const { parsed } = dotenv.config({ path });
  for (const key in parsed) process.env[key] = parsed[key];
  console.log(`Iniciado em ambiente ${process.env.NODE_ENV ?? 'development'} - arquivo ${path}`);
}
