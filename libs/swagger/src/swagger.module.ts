import { DynamicModule, Module } from '@nestjs/common';

import { SwaggerOptionsInterface } from './swagger-options.interface';
import { SWAGGER_OPTIONS_PROVIDER } from './swagger.constants';
import { SwaggerService } from './swagger.service';

@Module({})
export class SwaggerModule {
  static register(options: SwaggerOptionsInterface): DynamicModule {
    return {
      module: SwaggerModule,
      providers: [
        {
          provide: SWAGGER_OPTIONS_PROVIDER,
          useValue: options,
        },
        SwaggerService,
      ],
      exports: [SwaggerService],
    };
  }
}
