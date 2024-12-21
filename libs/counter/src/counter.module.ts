import { DynamicModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@swapi/database';

import { CounterConsumer } from './counter.consumer';
import {
  COUNTER_OPTIONS_PROVIDER,
  COUNTER_QUEUE_NAME,
} from './counter.constants';
import { CounterOptionsInterface } from './counter-options.interface';
import { CounterSubscriber } from './counter.subscriber';

@Module({})
export class CounterModule {
  static forRoot(options: CounterOptionsInterface): DynamicModule {
    return {
      module: CounterModule,
      imports: [
        BullModule.registerQueue({
          name: COUNTER_QUEUE_NAME,
        }),
        DatabaseModule,
      ],
      providers: [
        {
          provide: COUNTER_OPTIONS_PROVIDER,
          useValue: options,
        },
        CounterSubscriber,
        CounterConsumer,
      ],
      exports: [],
    };
  }
}
