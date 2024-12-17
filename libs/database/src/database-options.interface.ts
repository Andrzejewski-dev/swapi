import { DataSource } from 'typeorm';

export interface DatabaseOptionsInterface {
  datasource: DataSource;
  baseUrl: string;
}
