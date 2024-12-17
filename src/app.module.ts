import { DynamicModule, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CorsModule } from '@swapi/cors';
import { DatabaseModule } from '@swapi/database';
import { HttpServerModule } from '@swapi/http-server';
import { SwaggerModule } from '@swapi/swagger';

import { config } from './config';
import { datasource } from './datasource';

@Module({})
export class AppModule {
  static register(options?: ConfigType<typeof config>): DynamicModule {
    return {
      module: HttpServerModule,
      imports: [
        HttpServerModule.register({
          http: {
            enabled: options.httpServer.enabled,
            port: options.httpServer.port,
          },
          https: {
            enabled: options.httpServer.ssl.enabled,
            port: options.httpServer.ssl.port,
            certPath: options.httpServer.ssl.certPath,
            certKeyPath: options.httpServer.ssl.certKeyPath,
          },
        }),
        SwaggerModule.register({
          enabled: options.swagger.enabled,
          title: options.swagger.title ?? options.app.name,
        }),
        CorsModule.register({
          enabled: options.cors.enabled,
          options: options.cors.options,
        }),
        DatabaseModule.register({
          datasource,
          baseUrl: options.app.baseUrl,
        }),
      ],
      controllers: [],
      providers: [],
    };
  }
}
