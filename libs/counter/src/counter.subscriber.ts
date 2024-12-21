import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CounterOptionsInterface } from './counter-options.interface';
import {
  COUNTER_QUEUE_NAME,
  COUNTER_OPTIONS_PROVIDER,
  COUNTER_COUNT_WORDS_JOB_NAME,
} from './counter.constants';

@Injectable()
export class CounterSubscriber implements OnModuleInit {
  constructor(
    @InjectQueue(COUNTER_QUEUE_NAME)
    private queue: Queue,
    @Inject(COUNTER_OPTIONS_PROVIDER)
    private readonly options: CounterOptionsInterface,
  ) {}

  onModuleInit() {
    if (!this.options.enabled) {
      return;
    }
    this.queue.add(
      COUNTER_COUNT_WORDS_JOB_NAME,
      {},
      { jobId: 'count-words-init', delay: 60_000 },
    );
    this.queue.add(
      COUNTER_COUNT_WORDS_JOB_NAME,
      {},
      {
        repeat: {
          pattern: this.options.cron,
        },
        jobId: 'count-words-repeat',
      },
    );
  }
}
