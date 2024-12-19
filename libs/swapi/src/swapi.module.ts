import { DynamicModule, Global, Module } from '@nestjs/common';
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

@Global()
@Module({
  imports: [HttpModule],
  providers: [
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
})
export class SwapiModule {
  static forRoot(options: SwapiOptionsInterface): DynamicModule {
    return {
      module: SwapiModule,
      providers: [
        {
          provide: SWAPI_OPTIONS_PROVIDER,
          useValue: options,
        },
      ],
      exports: [SWAPI_OPTIONS_PROVIDER],
    };
  }
}
