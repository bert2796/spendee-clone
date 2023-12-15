/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './modules/app.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const configService = new ConfigService();
  const port = configService.get<number>('PORT');
  const host = configService.get<string>('HOST');

  const app = await NestFactory.createMicroservice(AppModule, {
    options: {
      host,
      port,
    },
    transport: Transport.TCP,
  });

  await app.listen();

  logger.log(`Auth Service listening at http://${host}:${port}`);
}

bootstrap();
