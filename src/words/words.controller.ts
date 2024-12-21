import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { WordDto, PaginatedDto } from '@swapi/common';
import { WordsService as WordsDbService } from '@swapi/database';

@ApiTags('Words')
@Controller('words')
export class WordsController {
  constructor(private readonly wordsDbService: WordsDbService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of words retrieved successfully.',
    type: WordDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Page not found.' })
  async findAll(
    @Query('page') page: number = 1,
  ): Promise<PaginatedDto<WordDto>> {
    return this.wordsDbService.findAll(+page);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the word to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'Word retrieved successfully.',
    type: WordDto,
  })
  @ApiResponse({ status: 404, description: 'Word not found.' })
  async findOne(@Param('id') id: number): Promise<WordDto> {
    const word = await this.wordsDbService.findOne(+id);
    if (!word) {
      throw new HttpException(
        `Word with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return word;
  }
}
