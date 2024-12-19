import { Injectable } from '@nestjs/common';
import { extractIdFromUrl, replaceUrlBase, StarshipDto } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class StarshipsService extends ResourcesService<StarshipDto> {
  protected readonly endpoint: string = 'starships';

  convertResourceToDto(resource: any): StarshipDto {
    return {
      ...resource,
      id: extractIdFromUrl(resource.url, 'starships'),
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
      created_at: new Date(resource.created),
      updated_at: new Date(resource.edited),
    };
  }
}
