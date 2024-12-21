import { Job } from 'bullmq';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { FilmsService, WordsService } from '@swapi/database';

import {
  COUNTER_COUNT_WORDS_JOB_NAME,
  COUNTER_QUEUE_NAME,
} from './counter.constants';
import { PaginatedDto, FilmDto } from '@swapi/common';

@Processor(COUNTER_QUEUE_NAME)
export class CounterConsumer extends WorkerHost {
  private readonly logger = new Logger(CounterConsumer.name);

  constructor(
    @Inject()
    private filmsService: FilmsService,
    @Inject()
    private wordsService: WordsService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<void> {
    if (job.name !== COUNTER_COUNT_WORDS_JOB_NAME) {
      return;
    }
    this.logger.log('Start counting words...');
    try {
      let page = 1;
      let response: PaginatedDto<FilmDto>;
      const wordOccurrences = new Map();
      do {
        response = await this.filmsService.findAll(page);
        for (const result of response.results) {
          result.opening_crawl
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, ' ')
            .split(/\s+/)
            .filter((word) => word.length > 0)
            .forEach((word) => {
              if (wordOccurrences.has(word)) {
                wordOccurrences.set(word, wordOccurrences.get(word) + 1);
              } else {
                wordOccurrences.set(word, 1);
              }
            });
        }
        page++;
      } while (response.next);

      await this.wordsService.removeAll();
      await Promise.all(
        Array.from(wordOccurrences).map(([word, occurrences]) =>
          this.wordsService.create(word, occurrences),
        ),
      );

      this.logger.log('Words counted successfully.');
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
