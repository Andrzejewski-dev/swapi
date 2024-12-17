import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseSubscriber } from './database.subscriber';
import { DatabaseOptionsInterface } from './database-options.interface';
import { DATABASE_OPTIONS_PROVIDER } from './database.constants';
import {
  FilmsService,
  PeopleService,
  PlanetsService,
  SpeciesService,
  StarshipsService,
  VehiclesService,
} from './services';
import * as entities from './entities';
import * as migrations from './migrations';

@Module({})
export class DatabaseModule {
  static register(options: DatabaseOptionsInterface): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          ...options.datasource.options,
          entities,
          migrations,
        }),
        TypeOrmModule.forFeature([
          entities.Film,
          entities.Person,
          entities.Planet,
          entities.Species,
          entities.Starship,
          entities.Vehicle,
        ]),
      ],
      providers: [
        {
          provide: DATABASE_OPTIONS_PROVIDER,
          useValue: options,
        },
        DatabaseSubscriber,
        FilmsService,
        PeopleService,
        PlanetsService,
        SpeciesService,
        StarshipsService,
        VehiclesService,
      ],
      exports: [
        FilmsService,
        PeopleService,
        PlanetsService,
        SpeciesService,
        StarshipsService,
        VehiclesService,
      ],
    };
  }
}
