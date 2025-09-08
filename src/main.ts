import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import 'dotenv/config';
import * as process from 'node:process';
import { DEFAULT_VALUES } from './constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: [{ path: 'doc', method: RequestMethod.ALL }] });
  app.useGlobalPipes(new ValidationPipe());
  const port = Number(process.env.PORT) || DEFAULT_VALUES.port;

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MovieDB API')
    .setDescription('Backend for MovieDB App')
    .setVersion('1.0')
    .addTag('Resources')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(port);
}
bootstrap();
