import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { StarshipDto, PaginatedDto } from '@swapi/common';
import { StarshipsService as StarshipsDbService } from '@swapi/database';
import { StarshipsService as StarshipsApiService } from '@swapi/swapi';

@ApiTags('Starships')
@Controller('starships')
export class StarshipsController {
  constructor(
    private readonly starshipsDbService: StarshipsDbService,
    private readonly starshipsApiService: StarshipsApiService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of starships retrieved successfully.',
    type: StarshipDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Page not found.' })
  async findAll(
    @Query('page') page: number = 1,
  ): Promise<PaginatedDto<StarshipDto>> {
    return this.starshipsDbService.findAll(+page);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the starship to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'Starship retrieved successfully.',
    type: StarshipDto,
  })
  @ApiResponse({ status: 404, description: 'Starship not found.' })
  async findOne(@Param('id') id: number): Promise<StarshipDto> {
    const starship =
      (await this.starshipsDbService.findOne(+id)) ??
      (await this.starshipsApiService.findOne(+id));
    if (!starship) {
      throw new HttpException(
        `Starship with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return starship;
  }
}
