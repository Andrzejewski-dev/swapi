import { Module } from '@nestjs/common';
import { DatabaseModule } from '@swapi/database';
import { SwapiModule } from '@swapi/swapi';

import { WordsController } from './words.controller';

@Module({
  imports: [DatabaseModule, SwapiModule],
  controllers: [WordsController],
  providers: [],
})
export class WordsModule {}
