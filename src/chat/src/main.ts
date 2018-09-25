import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: process.env.NODE_ENV !== 'development',
  }));
  await app.listen(3000);
}
bootstrap();
