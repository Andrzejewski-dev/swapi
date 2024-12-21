import { FindOptionsOrder, Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordDto } from '@swapi/common';

import { Word } from '../entities';
import { ResourcesService } from './resources.service';
import { DatabaseOptionsInterface } from '../database-options.interface';
import { DATABASE_OPTIONS_PROVIDER } from '../database.constants';

export class WordsService extends ResourcesService<Word, WordDto> {
  protected defaultOrder = {
    occurrences: 'DESC',
  } as FindOptionsOrder<Word>;

  constructor(
    @InjectRepository(Word)
    protected repository: Repository<Word>,
    @Inject(DATABASE_OPTIONS_PROVIDER)
    private options: DatabaseOptionsInterface,
  ) {
    super(repository, `${options.appBaseUrl}/api/words`);
  }

  async create(word: string, occurrences: number): Promise<void> {
    const entity = new Word();
    entity.word = word;
    entity.occurrences = occurrences;

    await this.repository.save(entity);
  }

  async removeAll(): Promise<void> {
    this.repository.clear();
  }

  parseEntityToDto(entity: Word): WordDto {
    const dto = new WordDto();
    dto.id = entity.id;
    dto.word = entity.word;
    dto.occurrences = entity.occurrences;
    dto.created_at = +entity.created_at;
    dto.updated_at = +entity.updated_at;
    dto.url = `${this.options.appBaseUrl}/api/words/${entity.id}`;

    return dto;
  }

  parseDtoToEntity(dto: WordDto): Word {
    const entity = new Word();
    entity.id = dto.id;
    entity.word = dto.word;
    entity.occurrences = dto.occurrences;
    entity.created_at = new Date(dto.created_at);
    entity.updated_at = new Date(dto.updated_at);

    return entity;
  }
}
