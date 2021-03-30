import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const configConfig = config.get('server');

  const port = 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Application is listening on port ${port}`);
}
bootstrap();
