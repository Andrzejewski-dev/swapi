import { DataSource } from 'typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseSubscriber implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSubscriber.name);

  constructor(private dataSource: DataSource) {}

  onModuleInit() {
    this.logger.log('Starting migrations...');
    this.dataSource
      .runMigrations()
      .then(() => this.logger.log('Migrations completed successfully.'))
      .catch((error) => {
        this.logger.error('Error during migrations:', error);
        throw error;
      });
  }
}
