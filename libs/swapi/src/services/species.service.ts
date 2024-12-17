import { Injectable } from '@nestjs/common';
import { replaceUrlBase, SpeciesDto } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class SpeciesService extends ResourcesService<SpeciesDto> {
  protected readonly endpoint: string = 'species';

  convertResourceToDto(resource: any): SpeciesDto {
    return {
      ...resource,
      homeworld: replaceUrlBase(this.options.appBaseUrl, resource.homeworld),
      people: resource.people.map((person) =>
        replaceUrlBase(this.options.appBaseUrl, person),
      ),
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
    };
  }
}
