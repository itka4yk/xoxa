import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as validation from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: process.env.NODE_ENV !== 'development',
  }));
  await app.listen(8080);
}
bootstrap();
