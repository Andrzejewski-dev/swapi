import { DynamicModule, Module } from '@nestjs/common';

import { CorsOptionsInterface } from './cors-options.interface';
import { CORS_OPTIONS_PROVIDER } from './cors.constants';
import { CorsService } from './cors.service';

@Module({})
export class CorsModule {
  static register(options: CorsOptionsInterface): DynamicModule {
    return {
      module: CorsModule,
      providers: [
        {
          provide: CORS_OPTIONS_PROVIDER,
          useValue: options,
        },
        CorsService,
      ],
      exports: [CorsService],
    };
  }
}
