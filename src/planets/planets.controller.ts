import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { PlanetDto, PaginatedDto } from '@swapi/common';
import { PlanetsService as PlanetsDbService } from '@swapi/database';
import { PlanetsService as PlanetsApiService } from '@swapi/swapi';

@ApiTags('Planets')
@Controller('planets')
export class PlanetsController {
  constructor(
    private readonly planetsDbService: PlanetsDbService,
    private readonly planetsApiService: PlanetsApiService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of planets retrieved successfully.',
    type: PlanetDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Page not found.' })
  async findAll(
    @Query('page') page: number = 1,
  ): Promise<PaginatedDto<PlanetDto>> {
    return this.planetsDbService.findAll(page);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the planet to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'Planet retrieved successfully.',
    type: PlanetDto,
  })
  @ApiResponse({ status: 404, description: 'Planet not found.' })
  async findOne(@Param('id') id: number): Promise<PlanetDto> {
    const planet =
      (await this.planetsDbService.findOne(id)) ??
      (await this.planetsApiService.findOne(id));
    if (!planet) {
      throw new HttpException(
        `Planet with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return planet;
  }
}
