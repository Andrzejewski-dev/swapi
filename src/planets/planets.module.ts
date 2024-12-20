import { Module } from '@nestjs/common';
import { DatabaseModule } from '@swapi/database';
import { SwapiModule } from '@swapi/swapi';

import { PlanetsController } from './planets.controller';

@Module({
  imports: [DatabaseModule, SwapiModule],
  controllers: [PlanetsController],
  providers: [],
})
export class PlanetsModule {}
