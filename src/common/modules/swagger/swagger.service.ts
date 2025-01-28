import { INestApplication, Injectable } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Config } from './docs/config';
import { PropertyProducerDoc } from './docs/domain/producer/property-producer-doc';
import { PropertyPropertyDoc } from './docs/domain/property/property-property-doc';
import { PropertyPlantingDoc } from './docs/domain/planting/property-planting-doc';

@Injectable()
export class SwaggerService {
  static setup(app: INestApplication, global_prefix = '') {
    const path = `${global_prefix}${Config.path}`;

    const config = new DocumentBuilder()
      .setTitle(Config.title)
      .setDescription(Config.description)
      .setVersion(Config.version)
      .addTag(PropertyProducerDoc.tagName, PropertyProducerDoc.tagDescription)
      .addTag(PropertyPropertyDoc.tagName, PropertyPropertyDoc.tagDescription)
      .addTag(PropertyPlantingDoc.tagName, PropertyPlantingDoc.tagDescription)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const options: SwaggerCustomOptions = {
      customSiteTitle: Config.customSiteTitle,
    };

    SwaggerModule.setup(path, app, document, options);
  }
}
