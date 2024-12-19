import { Injectable } from '@nestjs/common';
import { extractIdFromUrl, replaceUrlBase, VehicleDto } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class VehiclesService extends ResourcesService<VehicleDto> {
  protected readonly endpoint: string = 'vehicles';

  convertResourceToDto(resource: any): VehicleDto {
    return {
      ...resource,
      id: extractIdFromUrl(resource.url, 'vehicles'),
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
      created_at: new Date(resource.created),
      updated_at: new Date(resource.edited),
    };
  }
}
