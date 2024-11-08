import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env.dev' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  // host: 'postgresdb',
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  // dropSchema: true,
  entities: ['dist/modules/**/entities/*.entity.js'],
  migrations: ['dist/migration/*.js'],
};

export default registerAs('dbConfig', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
