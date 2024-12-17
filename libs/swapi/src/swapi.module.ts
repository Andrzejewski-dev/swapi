import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SwapiOptionsInterface } from './swapi-options.interface';
import { SWAPI_OPTIONS_PROVIDER } from './swapi.constants';
import {
  FilmsService,
  PeopleService,
  PlanetsService,
  SpeciesService,
  StarshipsService,
  VehiclesService,
} from './services';

@Module({})
export class SwapiModule {
  static register(options: SwapiOptionsInterface): DynamicModule {
    return {
      module: SwapiModule,
      imports: [HttpModule],
      providers: [
        {
          provide: SWAPI_OPTIONS_PROVIDER,
          useValue: options,
        },
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
