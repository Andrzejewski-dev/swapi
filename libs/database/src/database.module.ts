import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseOptionsInterface } from './database-options.interface';
import { DATABASE_OPTIONS_PROVIDER } from './database.constants';
import { DatabaseSubscriber } from './database.subscriber';
import {
  FilmsService,
  PeopleService,
  PlanetsService,
  SpeciesService,
  StarshipsService,
  VehiclesService,
  WordsService,
} from './services';
import * as entities from './entities';
import * as migrations from './migrations';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      entities.Film,
      entities.Person,
      entities.Planet,
      entities.Species,
      entities.Starship,
      entities.Vehicle,
      entities.Word,
    ]),
  ],
  providers: [
    FilmsService,
    PeopleService,
    PlanetsService,
    SpeciesService,
    StarshipsService,
    VehiclesService,
    WordsService,
  ],
  exports: [
    FilmsService,
    PeopleService,
    PlanetsService,
    SpeciesService,
    StarshipsService,
    VehiclesService,
    WordsService,
  ],
})
export class DatabaseModule {
  static forRoot(options: DatabaseOptionsInterface): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          ...options.datasource.options,
          entities,
          migrations,
        }),
      ],
      providers: [
        {
          provide: DATABASE_OPTIONS_PROVIDER,
          useValue: options,
        },
        DatabaseSubscriber,
      ],
      exports: [DATABASE_OPTIONS_PROVIDER],
    };
  }
}
