import { Injectable } from '@nestjs/common';
import { extractIdFromUrl, PersonDto, replaceUrlBase } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class PeopleService extends ResourcesService<PersonDto> {
  protected readonly endpoint: string = 'people';

  convertResourceToDto(resource: any): PersonDto {
    return {
      ...resource,
      homeworld: replaceUrlBase(this.options.appBaseUrl, resource.homeworld),
      id: extractIdFromUrl(resource.url, 'people'),
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
      created_at: new Date(resource.created),
      updated_at: new Date(resource.edited),
    };
  }
}
