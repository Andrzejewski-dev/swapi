import { Injectable } from '@nestjs/common';
import { replaceUrlBase, StarshipDto } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class StarshipsService extends ResourcesService<StarshipDto> {
  protected readonly endpoint: string = 'starships';

  convertResourceToDto(resource: any): StarshipDto {
    return {
      ...resource,
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
    };
  }
}
