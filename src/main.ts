import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { bootstrapEnvironmentVariables } from './bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  // Permite o uso de injeção de depencências em custom validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
  .setTitle('E-varejo')
  .setDescription('E-varejo Api Description')
  .setVersion('1.0')
  .addTag('e-varejo')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrapEnvironmentVariables();
bootstrap();
