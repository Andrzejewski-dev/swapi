import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ImporterOptionsInterface } from './importer-options.interface';
import {
  IMPORTER_QUEUE_NAME,
  IMPORTER_OPTIONS_PROVIDER,
  IMPORTER_LOAD_DATA_JOB_NAME,
} from './importer.constants';

@Injectable()
export class ImporterSubscriber implements OnModuleInit {
  constructor(
    @InjectQueue(IMPORTER_QUEUE_NAME)
    private queue: Queue,
    @Inject(IMPORTER_OPTIONS_PROVIDER)
    private readonly options: ImporterOptionsInterface,
  ) {}

  onModuleInit() {
    if (!this.options.enabled) {
      return;
    }
    this.queue.add(
      IMPORTER_LOAD_DATA_JOB_NAME,
      {},
      { jobId: 'load-job-init', delay: 5_000 },
    );
    this.queue.add(
      IMPORTER_LOAD_DATA_JOB_NAME,
      {},
      {
        repeat: {
          pattern: this.options.cron,
        },
        jobId: 'load-data-repeat',
      },
    );
  }
}
