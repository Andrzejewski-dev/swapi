import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PaginatedDto, ResourceDto } from '@swapi/common';

import { Entity as EntityType } from '../types';

export abstract class ResourcesService<
  Entity extends EntityType,
  DTO extends ResourceDto,
> {
  protected defaultRelations = [];

  constructor(
    protected repository: Repository<Entity>,
    protected listUrl: string,
  ) {}

  async findAll(page?: number): Promise<PaginatedDto<DTO>> {
    const [results, count] = await this.repository.findAndCount({
      skip: (page - 1) * 10,
      take: 10,
      relations: this.defaultRelations,
      relationLoadStrategy: 'query',
      order: {
        id: 'ASC',
      } as FindOptionsOrder<Entity>,
    });
    const nextPage = page * 10 < count ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    return {
      count,
      next: nextPage ? `${this.listUrl}?page=${nextPage}` : null,
      previous: previousPage ? `${this.listUrl}?page=${previousPage}` : null,
      results: results.map((entity) => this.parseEntityToDto(entity)),
    };
  }

  async findOne(id: number): Promise<DTO | null> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<Entity>,
      relations: this.defaultRelations,
    });

    return entity ? this.parseEntityToDto(entity) : null;
  }

  async save(entity: DTO): Promise<void> {
    await this.repository.save(this.parseDtoToEntity(entity));
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  abstract parseEntityToDto(entity: Entity): DTO;
  abstract parseDtoToEntity(dto: DTO): Entity;
}
