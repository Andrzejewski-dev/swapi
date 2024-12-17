import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extractIdsFromUrls, StarshipDto } from '@swapi/common';

import { Starship, Person } from '../entities';
import { ResourcesService } from './resources.service';
import { DatabaseOptionsInterface } from '../database-options.interface';
import { DATABASE_OPTIONS_PROVIDER } from '../database.constants';

export class StarshipsService extends ResourcesService<Starship, StarshipDto> {
  constructor(
    @InjectRepository(Starship)
    protected repository: Repository<Starship>,
    @Inject(DATABASE_OPTIONS_PROVIDER)
    private options: DatabaseOptionsInterface,
  ) {
    super(repository);
  }

  parseEntityToDto(entity: Starship): StarshipDto {
    const dto = new StarshipDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.model = entity.model;
    dto.starship_class = entity.starship_class;
    dto.manufacturer = entity.manufacturer;
    dto.cost_in_credits = entity.cost_in_credits;
    dto.length = entity.length;
    dto.crew = entity.crew;
    dto.passengers = entity.passengers;
    dto.max_atmosphering_speed = entity.max_atmosphering_speed;
    dto.hyperdrive_rating = entity.hyperdrive_rating;
    dto.MGLT = entity.MGLT;
    dto.cargo_capacity = entity.cargo_capacity;
    dto.consumables = entity.consumables;
    dto.created_at = +entity.created_at;
    dto.updated_at = +entity.updated_at;
    dto.url = `${this.options.baseUrl}/api/starships/${entity.id}`;
    dto.pilots = entity.people.map(
      (pilot) => `${this.options.baseUrl}/api/pilots/${pilot.id}`,
    );

    return dto;
  }

  parseDtoToEntity(dto: StarshipDto): Starship {
    const entity = new Starship();
    entity.id = dto.id;
    entity.name = dto.name;
    entity.model = dto.model;
    entity.starship_class = dto.starship_class;
    entity.manufacturer = dto.manufacturer;
    entity.cost_in_credits = dto.cost_in_credits;
    entity.length = dto.length;
    entity.crew = dto.crew;
    entity.passengers = dto.passengers;
    entity.max_atmosphering_speed = dto.max_atmosphering_speed;
    entity.hyperdrive_rating = dto.hyperdrive_rating;
    entity.MGLT = dto.MGLT;
    entity.cargo_capacity = dto.cargo_capacity;
    entity.consumables = dto.consumables;
    entity.created_at = new Date(dto.created_at);
    entity.updated_at = new Date(dto.updated_at);

    if (dto.pilots?.length) {
      entity.people = extractIdsFromUrls(dto.pilots, 'people').map((id) => {
        const pilot = new Person();
        pilot.id = id;
        return pilot;
      });
    }

    return entity;
  }
}
