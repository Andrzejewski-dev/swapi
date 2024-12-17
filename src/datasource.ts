import { DataSource } from 'typeorm';
import { extname } from 'path';
import { ConfigModule } from '@nestjs/config';

import { config } from './config';

ConfigModule.forRoot();
const options = config();
const ext = extname(__filename);

export const datasource = new DataSource({
  type: 'postgres',
  host: options.database.host,
  port: options.database.port,
  username: options.database.username,
  password: options.database.password,
  database: options.database.database,
  migrationsTableName: 'migrations_node',
  ...(ext !== '.js'
    ? {
        entities: [`${__dirname}/../**/*.entity${ext}`],
        migrations: [`${__dirname}/../**/migrations/*${ext}`],
      }
    : {}),
});
