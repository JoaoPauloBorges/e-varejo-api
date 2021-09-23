import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrapEnvironmentVariables } from './bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrapEnvironmentVariables();
bootstrap();
