import { Injectable } from '@nestjs/common';
import { replaceUrlBase, VehicleDto } from '@swapi/common';
import { ResourcesService } from './resources.service';

@Injectable()
export class VehiclesService extends ResourcesService<VehicleDto> {
  protected readonly endpoint: string = 'vehicles';

  convertResourceToDto(resource: any): VehicleDto {
    return {
      ...resource,
      url: replaceUrlBase(this.options.appBaseUrl, resource.url),
    };
  }
}
