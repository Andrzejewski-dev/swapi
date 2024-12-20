import { Module } from '@nestjs/common';
import { DatabaseModule } from '@swapi/database';
import { SwapiModule } from '@swapi/swapi';

import { PeopleController } from './people.controller';

@Module({
  imports: [DatabaseModule, SwapiModule],
  controllers: [PeopleController],
  providers: [],
})
export class PeopleModule {}
