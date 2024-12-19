import { Injectable } from '@nestjs/common';
import { extractIdFromUrl, PlanetDto, replaceUrlBase } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class PlanetsService extends ResourcesService<PlanetDto> {
  protected readonly endpoint: string = 'planets';

  convertResourceToDto(resource: any): PlanetDto {
    return {
      ...resource,
      id: extractIdFromUrl(resource.url, 'planets'),
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
      created_at: new Date(resource.created),
      updated_at: new Date(resource.edited),
    };
  }
}
