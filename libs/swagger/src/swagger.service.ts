import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerOptionsInterface } from './swagger-options.interface';
import { SWAGGER_OPTIONS_PROVIDER } from './swagger.constants';

@Injectable()
export class SwaggerService {
  constructor(
    @Inject(SWAGGER_OPTIONS_PROVIDER)
    private options: SwaggerOptionsInterface,
  ) {}

  init(app: INestApplication): void {
    if (!this.options.enabled) {
      return;
    }

    const options = new DocumentBuilder()
      .setTitle(
        this.options.title ?? process.env.npm_package_name ?? 'App name',
      )
      .setVersion(
        this.options.version ?? process.env.npm_package_version ?? '0.0.0',
      );

    const document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup('api', app, document);
  }
}
