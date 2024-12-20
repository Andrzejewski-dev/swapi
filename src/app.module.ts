import { DynamicModule, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { CorsModule } from '@swapi/cors';
import { DatabaseModule } from '@swapi/database';
import { HttpServerModule } from '@swapi/http-server';
import { SwaggerModule } from '@swapi/swagger';
import { SwapiModule } from '@swapi/swapi';
import { ImporterModule } from '@swapi/importer';

import { config } from './config';
import { datasource } from './datasource';
import { FilmsModule } from './films';
import { PeopleModule } from './people';
import { PlanetsModule } from './planets';
import { SpeciesModule } from './species';
import { StarshipsModule } from './starships';
import { VehiclesModule } from './vehicles';

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
        DatabaseModule.forRoot({
          datasource,
          appBaseUrl: options.app.baseUrl,
        }),
        SwapiModule.forRoot({
          baseUrl: options.swapi.baseUrl,
          appBaseUrl: options.app.baseUrl,
        }),
        BullModule.forRoot({
          connection: options.bullmq.connection,
        }),
        ImporterModule.forRoot({
          enabled: options.importer.enabled,
          cron: options.importer.cron,
        }),
        FilmsModule,
        PeopleModule,
        PlanetsModule,
        SpeciesModule,
        StarshipsModule,
        VehiclesModule,
      ],
      controllers: [],
      providers: [],
    };
  }
}
