import { Module } from '@nestjs/common';
import { DatabaseModule } from '@swapi/database';
import { SwapiModule } from '@swapi/swapi';

import { StarshipsController } from './starships.controller';

@Module({
  imports: [DatabaseModule, SwapiModule],
  controllers: [StarshipsController],
  providers: [],
})
export class StarshipsModule {}
