import { Module } from '@nestjs/common';
import { DatabaseModule } from '@swapi/database';
import { SwapiModule } from '@swapi/swapi';

import { VehiclesController } from './vehicles.controller';

@Module({
  imports: [DatabaseModule, SwapiModule],
  controllers: [VehiclesController],
  providers: [],
})
export class VehiclesModule {}
