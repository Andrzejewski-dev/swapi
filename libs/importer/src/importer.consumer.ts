import { Job } from 'bullmq';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import {
  FilmDto,
  PaginatedDto,
  PersonDto,
  PlanetDto,
  SpeciesDto,
  StarshipDto,
  VehicleDto,
} from '@swapi/common';
import {
  FilmsService as FilmsApiService,
  PeopleService as PeopleApiService,
  PlanetsService as PlanetsApiService,
  SpeciesService as SpeciesApiService,
  StarshipsService as StarshipsApiService,
  VehiclesService as VehiclesApiService,
} from '@swapi/swapi';
import {
  FilmsService as FilmsDbService,
  PeopleService as PeopleDbService,
  PlanetsService as PlanetsDbService,
  SpeciesService as SpeciesDbService,
  StarshipsService as StarshipsDbService,
  VehiclesService as VehiclesDbService,
} from '@swapi/database';

import {
  IMPORTER_LOAD_DATA_JOB_NAME,
  IMPORTER_QUEUE_NAME,
} from './importer.constants';

@Processor(IMPORTER_QUEUE_NAME)
export class ImporterConsumer extends WorkerHost {
  private readonly logger = new Logger(ImporterConsumer.name);

  constructor(
    @Inject()
    private planetsApiService: PlanetsApiService,
    @Inject()
    private planetsDbService: PlanetsDbService,
    @Inject()
    private speciesApiService: SpeciesApiService,
    @Inject()
    private speciesDbService: SpeciesDbService,
    @Inject()
    private starshipsApiService: StarshipsApiService,
    @Inject()
    private starshipsDbService: StarshipsDbService,
    @Inject()
    private peopleApiService: PeopleApiService,
    @Inject()
    private peopleDbService: PeopleDbService,
    @Inject()
    private vehiclesApiService: VehiclesApiService,
    @Inject()
    private vehiclesDbService: VehiclesDbService,
    @Inject()
    private filmsApiService: FilmsApiService,
    @Inject()
    private filmsDbService: FilmsDbService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<void> {
    if (job.name !== IMPORTER_LOAD_DATA_JOB_NAME) {
      return;
    }
    this.logger.log('Starting import resources...');
    try {
      await this.importPlanets();
      await this.importPeople();
      await this.importSpecies();
      await this.importStarships();
      await this.importVehicles();
      await this.importFilms();

      this.logger.log('Resources imported successfully.');
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async importPlanets(): Promise<void> {
    let planetPage = 1;
    let planetResponse: PaginatedDto<PlanetDto>;
    do {
      planetResponse = await this.planetsApiService.findAll(planetPage);
      await Promise.all(
        planetResponse.results.map((planet) =>
          this.planetsDbService.save(planet),
        ),
      );
      planetPage++;
    } while (planetResponse.next);
  }

  private async importSpecies(): Promise<void> {
    let page = 1;
    let response: PaginatedDto<SpeciesDto>;
    do {
      response = await this.speciesApiService.findAll(page);
      await Promise.all(
        response.results.map((result) => this.speciesDbService.save(result)),
      );
      page++;
    } while (response.next);
  }

  private async importStarships(): Promise<void> {
    let page = 1;
    let response: PaginatedDto<StarshipDto>;
    do {
      response = await this.starshipsApiService.findAll(page);
      await Promise.all(
        response.results.map((result) => {
          return this.starshipsDbService.save(result);
        }),
      );
      page++;
    } while (response.next);
  }

  private async importPeople(): Promise<void> {
    let page = 1;
    let response: PaginatedDto<PersonDto>;
    do {
      response = await this.peopleApiService.findAll(page);
      await Promise.all(
        response.results.map((result) => {
          return this.peopleDbService.save(result);
        }),
      );
      page++;
    } while (response.next);
  }

  private async importVehicles(): Promise<void> {
    let page = 1;
    let response: PaginatedDto<VehicleDto>;
    do {
      response = await this.vehiclesApiService.findAll(page);
      await Promise.all(
        response.results.map((result) => {
          delete result.films;
          return this.vehiclesDbService.save(result);
        }),
      );
      page++;
    } while (response.next);
  }

  private async importFilms(): Promise<void> {
    let page = 1;
    let response: PaginatedDto<FilmDto>;
    do {
      response = await this.filmsApiService.findAll(page);
      await Promise.all(
        response.results.map((result) => {
          return this.filmsDbService.save(result);
        }),
      );
      page++;
    } while (response.next);
  }
}
