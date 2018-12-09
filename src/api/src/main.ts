import fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exception.filter';

const httpsOptions = {
  key: fs.readFileSync('./xoxa-localhost.key'),
  cert: fs.readFileSync('./xoxa-localhost.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: true,
    }),
  );
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3001);
}
bootstrap();
