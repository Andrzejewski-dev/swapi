import { DynamicModule, Module } from '@nestjs/common';

import { HttpServerOptionsInterface } from './http-server-options.interface';
import { HTTP_SERVER_OPTIONS_PROVIDER } from './http-server.constants';
import { HttpServerService } from './http-server.service';

@Module({})
export class HttpServerModule {
  static register(options: HttpServerOptionsInterface): DynamicModule {
    return {
      module: HttpServerModule,
      providers: [
        {
          provide: HTTP_SERVER_OPTIONS_PROVIDER,
          useValue: options,
        },
        HttpServerService,
      ],
      exports: [HttpServerService],
    };
  }
}
