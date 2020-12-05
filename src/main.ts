import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.enableCors();

  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port

  await app.listen(port);
  logger.log(`App listening on port ${port}`)
}
bootstrap();
