import { Injectable } from '@nestjs/common';
import { extractIdFromUrl, FilmDto, replaceUrlBase } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class FilmsService extends ResourcesService<FilmDto> {
  protected readonly endpoint: string = 'films';

  convertResourceToDto(resource: any): FilmDto {
    return {
      ...resource,
      characters: resource.characters.map((character) =>
        replaceUrlBase(this.options.appBaseUrl, character),
      ),
      planets: resource.planets.map((planet) =>
        replaceUrlBase(this.options.appBaseUrl, planet),
      ),
      starships: resource.starships.map((starship) =>
        replaceUrlBase(this.options.appBaseUrl, starship),
      ),
      vehicles: resource.vehicles.map((vehicle) =>
        replaceUrlBase(this.options.appBaseUrl, vehicle),
      ),
      species: resource.species.map((species) =>
        replaceUrlBase(this.options.appBaseUrl, species),
      ),
      id: extractIdFromUrl(resource.url, 'films'),
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
      created_at: new Date(resource.created),
      updated_at: new Date(resource.edited),
    } as FilmDto;
  }
}
