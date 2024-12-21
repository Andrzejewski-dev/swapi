import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { SpeciesDto, PaginatedDto } from '@swapi/common';
import { SpeciesService as SpeciesDbService } from '@swapi/database';
import { SpeciesService as SpeciesApiService } from '@swapi/swapi';

@ApiTags('Species')
@Controller('species')
export class SpeciesController {
  constructor(
    private readonly speciesDbService: SpeciesDbService,
    private readonly speciesApiService: SpeciesApiService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of species retrieved successfully.',
    type: SpeciesDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Page not found.' })
  async findAll(
    @Query('page') page: number = 1,
  ): Promise<PaginatedDto<SpeciesDto>> {
    return this.speciesDbService.findAll(+page);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the species to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'Species retrieved successfully.',
    type: SpeciesDto,
  })
  @ApiResponse({ status: 404, description: 'Species not found.' })
  async findOne(@Param('id') id: number): Promise<SpeciesDto> {
    const species =
      (await this.speciesDbService.findOne(+id)) ??
      (await this.speciesApiService.findOne(+id));
    if (!species) {
      throw new HttpException(
        `Species with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return species;
  }
}
