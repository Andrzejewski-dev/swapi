import { FindOptionsWhere, Repository } from 'typeorm';
import { ResourceDto } from '@swapi/common';

import { Entity as EntityType } from '../types';

export abstract class ResourcesService<
  Entity extends EntityType,
  DTO extends ResourceDto,
> {
  constructor(protected repository: Repository<Entity>) {}

  async findAll(): Promise<DTO[]> {
    const entities = await this.repository.find();

    return entities.map((entity) => this.parseEntityToDto(entity));
  }

  async findOne(id: number): Promise<DTO | null> {
    const entity = await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<Entity>);

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
