import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';

export const entityManager = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: env.postgresUsername,
	password: env.postgresPassword,
	database: 'litboxd',
	entities: ['./src/entities/**/*.ts'],
	synchronize: true,
	logging: ['query', 'error'], // https://orkhan.gitbook.io/typeorm/docs/logging
});

entityManager
	.initialize()
	.then(() => {
		console.log(`Data Source has been initialized`);
	})
	.catch((err) => {
		console.error(`Data Source initialization error`, err);
	});

export default entityManager;
