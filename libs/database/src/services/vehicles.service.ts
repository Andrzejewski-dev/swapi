import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extractIdsFromUrls, VehicleDto } from '@swapi/common';

import { Vehicle, Film, Person } from '../entities';
import { ResourcesService } from './resources.service';
import { DatabaseOptionsInterface } from '../database-options.interface';
import { DATABASE_OPTIONS_PROVIDER } from '../database.constants';

export class VehiclesService extends ResourcesService<Vehicle, VehicleDto> {
  protected defaultRelations = ['films', 'pilots'];

  constructor(
    @InjectRepository(Vehicle)
    protected repository: Repository<Vehicle>,
    @Inject(DATABASE_OPTIONS_PROVIDER)
    private options: DatabaseOptionsInterface,
  ) {
    super(repository, `${options.appBaseUrl}/api/vehicles`);
  }

  parseEntityToDto(entity: Vehicle): VehicleDto {
    const dto = new VehicleDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.model = entity.model;
    dto.vehicle_class = entity.vehicle_class;
    dto.manufacturer = entity.manufacturer;
    dto.cost_in_credits = entity.cost_in_credits;
    dto.length = entity.length;
    dto.crew = entity.crew;
    dto.passengers = entity.passengers;
    dto.max_atmosphering_speed = entity.max_atmosphering_speed;
    dto.cargo_capacity = entity.cargo_capacity;
    dto.consumables = entity.consumables;
    dto.created_at = +entity.created_at;
    dto.updated_at = +entity.updated_at;
    dto.url = `${this.options.appBaseUrl}/api/vehicles/${entity.id}`;
    dto.films = entity.films.map(
      (film) => `${this.options.appBaseUrl}/api/films/${film.id}`,
    );
    dto.pilots = entity.pilots.map(
      (pilot) => `${this.options.appBaseUrl}/api/people/${pilot.id}`,
    );

    return dto;
  }

  parseDtoToEntity(dto: VehicleDto): Vehicle {
    const entity = new Vehicle();
    entity.id = dto.id;
    entity.name = dto.name;
    entity.model = dto.model;
    entity.vehicle_class = dto.vehicle_class;
    entity.manufacturer = dto.manufacturer;
    entity.cost_in_credits = dto.cost_in_credits;
    entity.length = dto.length;
    entity.crew = dto.crew;
    entity.passengers = dto.passengers;
    entity.max_atmosphering_speed = dto.max_atmosphering_speed;
    entity.cargo_capacity = dto.cargo_capacity;
    entity.consumables = dto.consumables;
    entity.created_at = new Date(dto.created_at);
    entity.updated_at = new Date(dto.updated_at);

    entity.films = extractIdsFromUrls(dto.films ?? [], 'films').map((id) => {
      const film = new Film();
      film.id = id;
      return film;
    });

    entity.pilots = extractIdsFromUrls(dto.pilots ?? [], 'people').map((id) => {
      const pilot = new Person();
      pilot.id = id;
      return pilot;
    });

    return entity;
  }
}
