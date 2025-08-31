import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { requestApi } from './middlewares/request-api.middleware';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import 'dotenv/config';
import * as process from 'node:process';
import { DEFAULT_VALUES } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestApi);
  app.useGlobalPipes(new ValidationPipe());
  const port = Number(process.env.PORT) || DEFAULT_VALUES.port;

  await app.listen(port);
}
bootstrap();
