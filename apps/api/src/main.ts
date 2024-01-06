/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { RpcToHttpExceptionFilter } from './filters/rpc-to-http-exception.filter';
import { AppModule } from './modules/app.module';
import { ConfigService } from './modules/config/config.service';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new RpcToHttpExceptionFilter());

  await app.listen(port, () => {
    logger.log(`API Gateway listening at http://localhost:${port}/api`);
  });
}

bootstrap();
