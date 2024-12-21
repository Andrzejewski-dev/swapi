import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { PersonDto, PaginatedDto } from '@swapi/common';
import { PeopleService as PeopleDbService } from '@swapi/database';
import { PeopleService as PeopleApiService } from '@swapi/swapi';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(
    private readonly peopleDbService: PeopleDbService,
    private readonly peopleApiService: PeopleApiService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of people retrieved successfully.',
    type: PersonDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Page not found.' })
  async findAll(
    @Query('page') page: number = 1,
  ): Promise<PaginatedDto<PersonDto>> {
    return this.peopleDbService.findAll(+page);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the person to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'Person retrieved successfully.',
    type: PersonDto,
  })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  async findOne(@Param('id') id: number): Promise<PersonDto> {
    const person =
      (await this.peopleDbService.findOne(+id)) ??
      (await this.peopleApiService.findOne(+id));
    if (!person) {
      throw new HttpException(
        `Person with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return person;
  }
}
