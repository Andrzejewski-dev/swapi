import { Injectable } from '@nestjs/common';
import { PersonDto, replaceUrlBase } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class PeopleService extends ResourcesService<PersonDto> {
  protected readonly endpoint: string = 'people';

  convertResourceToDto(resource: any): PersonDto {
    return {
      ...resource,
      homeworld: replaceUrlBase(this.options.appBaseUrl, resource.homeworld),
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
    };
  }
}
