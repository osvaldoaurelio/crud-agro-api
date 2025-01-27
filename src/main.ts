import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SwaggerService } from './common/modules/swagger/swagger.service';

const validationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  stopAtFirstError: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const global_prefix = config.get<string>('GLOBAL_PREFIX', 'v1/api');
  const corOptions = {
    origin: config.get<string>('CORS_ORIGIN', '*'),
    methods: config.get<string>('CORS_METHODS', 'GET,PATCH,POST,DELETE'),
  };

  app.enableCors(corOptions);
  app.useGlobalPipes(validationPipe);
  app.setGlobalPrefix(global_prefix);

  SwaggerService.setup(app, global_prefix);

  await app.listen(config.get<number>('PORT', 3333));
}

bootstrap();
