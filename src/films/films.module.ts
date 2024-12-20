import { Module } from '@nestjs/common';
import { DatabaseModule } from '@swapi/database';
import { SwapiModule } from '@swapi/swapi';

import { FilmsController } from './films.controller';

@Module({
  imports: [DatabaseModule, SwapiModule],
  controllers: [FilmsController],
  providers: [],
})
export class FilmsModule {}
