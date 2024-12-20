import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanetDto } from '@swapi/common';

import { Planet } from '../entities';
import { ResourcesService } from './resources.service';
import { DatabaseOptionsInterface } from '../database-options.interface';
import { DATABASE_OPTIONS_PROVIDER } from '../database.constants';

export class PlanetsService extends ResourcesService<Planet, PlanetDto> {
  constructor(
    @InjectRepository(Planet)
    protected repository: Repository<Planet>,
    @Inject(DATABASE_OPTIONS_PROVIDER)
    private options: DatabaseOptionsInterface,
  ) {
    super(repository, `${options.appBaseUrl}/api/planets`);
  }

  parseEntityToDto(entity: Planet): PlanetDto {
    const dto = new PlanetDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.diameter = entity.diameter;
    dto.rotation_period = entity.rotation_period;
    dto.orbital_period = entity.orbital_period;
    dto.gravity = entity.gravity;
    dto.population = entity.population;
    dto.climate = entity.climate;
    dto.terrain = entity.terrain;
    dto.surface_water = entity.surface_water;
    dto.created_at = +entity.created_at;
    dto.updated_at = +entity.updated_at;
    dto.url = `${this.options.appBaseUrl}/api/planets/${entity.id}`;

    return dto;
  }

  parseDtoToEntity(dto: PlanetDto): Planet {
    const entity = new Planet();
    entity.id = dto.id;
    entity.name = dto.name;
    entity.diameter = dto.diameter;
    entity.rotation_period = dto.rotation_period;
    entity.orbital_period = dto.orbital_period;
    entity.gravity = dto.gravity;
    entity.population = dto.population;
    entity.climate = dto.climate;
    entity.terrain = dto.terrain;
    entity.surface_water = dto.surface_water;
    entity.created_at = new Date(dto.created_at);
    entity.updated_at = new Date(dto.updated_at);

    return entity;
  }
}
