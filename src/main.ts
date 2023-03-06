import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

import * as bodyParser from 'body-parser';
import { HttpExceptionFilter, LoggerService } from 'hcp-bpcp-module-common';

import { AppModule } from './app.module';
import { SwaggerService } from './utils/swagger.service';

const port = process.env.PORT;

async function bootstrap() {
  const logger = new LoggerService('main');

  const app = await NestFactory.create(AppModule, {});
  app.setGlobalPrefix('/api/v1', {
    exclude: [{ path: '/hello', method: RequestMethod.GET }],
  });
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     errorHttpStatusCode: 422,
  //   }),
  // );

  // Swagger setup
  new SwaggerService().setupSwagger(app);

  // Exception Filter setup
  app.useGlobalFilters(new HttpExceptionFilter());

  // application setting
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  await app.listen(port);
  logger.debug(`Application is running on: ${await app.getUrl()}`);
  logger.debug(
    'For the Swagger UI, open http://localhost:' + port + '/api-docs/',
  );
}

bootstrap();
