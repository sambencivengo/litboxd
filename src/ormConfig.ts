import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';

export const appDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: env.postgresUsername,
	password: env.postgresUsername,
	database: 'litboxd',
	entities: ['./src/entities/**/*.ts'],
	synchronize: true,
	logging: ['query', 'error'], // https://orkhan.gitbook.io/typeorm/docs/logging
});
