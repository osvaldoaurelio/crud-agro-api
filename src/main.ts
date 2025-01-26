import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SwaggerService } from './common/modules/swagger/swagger.service';

const validationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN', '*'),
    methods: config.get<string>('CORS_METHODS', 'GET,PUT,POST,DELETE'),
  });
  app.useGlobalPipes(validationPipe);
  app.setGlobalPrefix(config.get<string>('GLOBAL_PREFIX', '/v1/api'));

  SwaggerService.setup(app);

  await app.listen(config.get<number>('PORT', 3333));
}

bootstrap();
