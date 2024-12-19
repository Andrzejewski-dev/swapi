import { Injectable } from '@nestjs/common';
import { extractIdFromUrl, replaceUrlBase, SpeciesDto } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class SpeciesService extends ResourcesService<SpeciesDto> {
  protected readonly endpoint: string = 'species';

  convertResourceToDto(resource: any): SpeciesDto {
    return {
      ...resource,
      homeworld: resource.homeworld
        ? replaceUrlBase(this.options.appBaseUrl, resource.homeworld)
        : null,
      people: resource.people.map((person) =>
        replaceUrlBase(this.options.appBaseUrl, person),
      ),
      id: extractIdFromUrl(resource.url, 'species'),
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
      created_at: new Date(resource.created),
      updated_at: new Date(resource.edited),
    };
  }
}
