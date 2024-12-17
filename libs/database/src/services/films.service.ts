import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extractIdsFromUrls, FilmDto } from '@swapi/common';

import { Film, Person, Planet, Species, Starship, Vehicle } from '../entities';
import { ResourcesService } from './resources.service';
import { DatabaseOptionsInterface } from '../database-options.interface';
import { DATABASE_OPTIONS_PROVIDER } from '../database.constants';

export class FilmsService extends ResourcesService<Film, FilmDto> {
  constructor(
    @InjectRepository(Film)
    protected repository: Repository<Film>,
    @Inject(DATABASE_OPTIONS_PROVIDER)
    private options: DatabaseOptionsInterface,
  ) {
    super(repository);
  }

  parseEntityToDto(entity: Film): FilmDto {
    const dto = new FilmDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.episode_id = entity.episode_id;
    dto.opening_crawl = entity.opening_crawl;
    dto.director = entity.director;
    dto.producer = entity.producer;
    dto.release_date = entity.release_date;
    dto.characters = entity.characters.map(
      (character) => `${this.options.baseUrl}/api/people/${character.id}`,
    );
    dto.planets = entity.planets.map(
      (planet) => `${this.options.baseUrl}/api/planets/${planet.id}`,
    );
    dto.starships = entity.starships.map(
      (starship) => `${this.options.baseUrl}/api/starships/${starship.id}`,
    );
    dto.vehicles = entity.vehicles.map(
      (vehicle) => `${this.options.baseUrl}/api/vehicles/${vehicle.id}`,
    );
    dto.species = entity.species.map(
      (species) => `${this.options.baseUrl}/api/species/${species.id}`,
    );
    dto.created_at = +entity.created_at;
    dto.updated_at = +entity.updated_at;
    dto.url = `${this.options.baseUrl}/api/films/${entity.id}`;

    return dto;
  }

  parseDtoToEntity(dto: FilmDto): Film {
    const entity = new Film();
    entity.id = dto.id;
    entity.title = dto.title;
    entity.episode_id = dto.episode_id;
    entity.opening_crawl = dto.opening_crawl;
    entity.director = dto.director;
    entity.producer = dto.producer;
    entity.release_date = dto.release_date;
    entity.characters = extractIdsFromUrls(dto.characters, 'people').map(
      (characterId) => {
        const character = new Person();
        character.id = characterId;
        return character;
      },
    );
    entity.planets = extractIdsFromUrls(dto.planets, 'planets').map(
      (planetId) => {
        const planet = new Planet();
        planet.id = planetId;
        return planet;
      },
    );
    entity.starships = extractIdsFromUrls(dto.starships, 'starships').map(
      (starshipId) => {
        const starship = new Starship();
        starship.id = starshipId;
        return starship;
      },
    );
    entity.vehicles = extractIdsFromUrls(dto.vehicles, 'vehicles').map(
      (vehicleId) => {
        const vehicle = new Vehicle();
        vehicle.id = vehicleId;
        return vehicle;
      },
    );
    entity.species = extractIdsFromUrls(dto.species, 'species').map(
      (speciesId) => {
        const species = new Species();
        species.id = speciesId;
        return species;
      },
    );
    entity.created_at = new Date(dto.created_at);
    entity.updated_at = new Date(dto.updated_at);

    return entity;
  }
}
