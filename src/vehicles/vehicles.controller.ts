import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { VehicleDto, PaginatedDto } from '@swapi/common';
import { VehiclesService as VehiclesDbService } from '@swapi/database';
import { VehiclesService as VehiclesApiService } from '@swapi/swapi';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesDbService: VehiclesDbService,
    private readonly vehiclesApiService: VehiclesApiService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of vehicles retrieved successfully.',
    type: VehicleDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Page not found.' })
  async findAll(
    @Query('page') page: number = 1,
  ): Promise<PaginatedDto<VehicleDto>> {
    return this.vehiclesDbService.findAll(+page);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the vehicle to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehicle retrieved successfully.',
    type: VehicleDto,
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async findOne(@Param('id') id: number): Promise<VehicleDto> {
    const vehicle =
      (await this.vehiclesDbService.findOne(+id)) ??
      (await this.vehiclesApiService.findOne(+id));
    if (!vehicle) {
      throw new HttpException(
        `Vehicle with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return vehicle;
  }
}
