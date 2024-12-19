import { DynamicModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@swapi/database';
import { SwapiModule } from '@swapi/swapi';

import { ImporterConsumer } from './importer.consumer';
import {
  IMPORTER_OPTIONS_PROVIDER,
  IMPORTER_QUEUE_NAME,
} from './importer.constants';
import { ImporterOptionsInterface } from './importer-options.interface';
import { ImporterSubscriber } from './importer.subscriber';

@Module({})
export class ImporterModule {
  static forRoot(options: ImporterOptionsInterface): DynamicModule {
    return {
      module: ImporterModule,
      imports: [
        BullModule.registerQueue({
          name: IMPORTER_QUEUE_NAME,
        }),
        DatabaseModule,
        SwapiModule,
      ],
      providers: [
        {
          provide: IMPORTER_OPTIONS_PROVIDER,
          useValue: options,
        },
        ImporterSubscriber,
        ImporterConsumer,
      ],
      exports: [],
    };
  }
}
