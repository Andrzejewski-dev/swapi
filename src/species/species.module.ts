import { Module } from '@nestjs/common';
import { DatabaseModule } from '@swapi/database';
import { SwapiModule } from '@swapi/swapi';

import { SpeciesController } from './species.controller';

@Module({
  imports: [DatabaseModule, SwapiModule],
  controllers: [SpeciesController],
  providers: [],
})
export class SpeciesModule {}
