import { Injectable } from '@nestjs/common';
import { PlanetDto, replaceUrlBase } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class PlanetsService extends ResourcesService<PlanetDto> {
  protected readonly endpoint: string = 'planets';

  convertResourceToDto(resource: any): PlanetDto {
    return {
      ...resource,
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
    };
  }
}
