import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { FilmDto, PaginatedDto } from '@swapi/common';
import { FilmsService as FilmsDbService } from '@swapi/database';
import { FilmsService as FilmsApiService } from '@swapi/swapi';

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(
    private readonly filmsDbService: FilmsDbService,
    private readonly filmsApiService: FilmsApiService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of films retrieved successfully.',
    type: FilmDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Page not found.' })
  async findAll(
    @Query('page') page: number = 1,
  ): Promise<PaginatedDto<FilmDto>> {
    return this.filmsDbService.findAll(+page);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the film to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'Film retrieved successfully.',
    type: FilmDto,
  })
  @ApiResponse({ status: 404, description: 'Film not found.' })
  async findOne(@Param('id') id: number): Promise<FilmDto> {
    const film =
      (await this.filmsDbService.findOne(+id)) ??
      (await this.filmsApiService.findOne(+id));
    if (!film) {
      throw new HttpException(
        `Film with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return film;
  }
}
