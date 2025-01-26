import { INestApplication, Injectable } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Doc } from './docs/documents';

@Injectable()
export class SwaggerService {
  static setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(Doc.config.title)
      .setDescription(Doc.config.description)
      .setVersion(Doc.config.version)
      .addTag(Doc.tags.suppliers.name, Doc.tags.suppliers.description)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const options: SwaggerCustomOptions = {
      customSiteTitle: Doc.config.customSiteTitle,
    };

    SwaggerModule.setup(Doc.config.path, app, document, options);
  }
}
