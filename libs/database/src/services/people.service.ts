import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extractIdFromUrl, PersonDto } from '@swapi/common';

import { Person, Planet } from '../entities';
import { ResourcesService } from './resources.service';
import { DatabaseOptionsInterface } from '../database-options.interface';
import { DATABASE_OPTIONS_PROVIDER } from '../database.constants';

export class PeopleService extends ResourcesService<Person, PersonDto> {
  constructor(
    @InjectRepository(Person)
    protected repository: Repository<Person>,
    @Inject(DATABASE_OPTIONS_PROVIDER)
    private options: DatabaseOptionsInterface,
  ) {
    super(repository);
  }

  parseEntityToDto(entity: Person): PersonDto {
    const dto = new PersonDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.height = entity.height;
    dto.mass = entity.mass;
    dto.hair_color = entity.hair_color;
    dto.skin_color = entity.skin_color;
    dto.eye_color = entity.eye_color;
    dto.birth_year = entity.birth_year;
    dto.gender = entity.gender;
    dto.homeworld = `${this.options.appBaseUrl}/api/planets/${entity.homeworld.id}`;
    dto.created_at = +entity.created_at;
    dto.updated_at = +entity.updated_at;
    dto.url = `${this.options.appBaseUrl}/api/people/${entity.id}`;

    return dto;
  }

  parseDtoToEntity(dto: PersonDto): Person {
    const entity = new Person();
    entity.id = dto.id;
    entity.name = dto.name;
    entity.height = dto.height;
    entity.mass = dto.mass;
    entity.hair_color = dto.hair_color;
    entity.skin_color = dto.skin_color;
    entity.eye_color = dto.eye_color;
    entity.birth_year = dto.birth_year;
    entity.gender = dto.gender;
    const homeworld = new Planet();
    homeworld.id = extractIdFromUrl(dto.homeworld, 'planets');
    entity.homeworld = homeworld;
    entity.created_at = new Date(dto.created_at);
    entity.updated_at = new Date(dto.updated_at);

    return entity;
  }
}
