import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  extractIdFromUrl,
  extractIdsFromUrls,
  SpeciesDto,
} from '@swapi/common';

import { Species, Planet, Person } from '../entities';
import { ResourcesService } from './resources.service';
import { DatabaseOptionsInterface } from '../database-options.interface';
import { DATABASE_OPTIONS_PROVIDER } from '../database.constants';

export class SpeciesService extends ResourcesService<Species, SpeciesDto> {
  protected defaultRelations = ['homeworld', 'people'];

  constructor(
    @InjectRepository(Species)
    protected repository: Repository<Species>,
    @Inject(DATABASE_OPTIONS_PROVIDER)
    private options: DatabaseOptionsInterface,
  ) {
    super(repository, `${options.appBaseUrl}/api/species`);
  }

  parseEntityToDto(entity: Species): SpeciesDto {
    const dto = new SpeciesDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.classification = entity.classification;
    dto.designation = entity.designation;
    dto.average_height = entity.average_height;
    dto.average_lifespan = entity.average_lifespan;
    dto.hair_colors = entity.hair_colors;
    dto.skin_colors = entity.skin_colors;
    dto.eye_colors = entity.eye_colors;
    dto.language = entity.language;
    dto.homeworld = entity.homeworld
      ? `${this.options.appBaseUrl}/api/planets/${entity.homeworld.id}`
      : null;
    dto.created_at = +entity.created_at;
    dto.updated_at = +entity.updated_at;
    dto.url = `${this.options.appBaseUrl}/api/species/${entity.id}`;
    dto.people = entity.people.map(
      (person) => `${this.options.appBaseUrl}/api/people/${person.id}`,
    );

    return dto;
  }

  parseDtoToEntity(dto: SpeciesDto): Species {
    const entity = new Species();
    entity.id = dto.id;
    entity.name = dto.name;
    entity.classification = dto.classification;
    entity.designation = dto.designation;
    entity.average_height = dto.average_height;
    entity.average_lifespan = dto.average_lifespan;
    entity.hair_colors = dto.hair_colors;
    entity.skin_colors = dto.skin_colors;
    entity.eye_colors = dto.eye_colors;
    entity.language = dto.language;
    if (dto.homeworld) {
      const homeworld = new Planet();
      homeworld.id = extractIdFromUrl(dto.homeworld, 'planets');
      entity.homeworld = homeworld;
    }
    if (dto.people?.length) {
      entity.people = extractIdsFromUrls(dto.people, 'people').map((id) => {
        const pilot = new Person();
        pilot.id = id;
        return pilot;
      });
    }
    entity.created_at = new Date(dto.created_at);
    entity.updated_at = new Date(dto.updated_at);

    return entity;
  }
}
