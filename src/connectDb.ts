import { DataSource } from 'typeorm';
import { User } from './entities';
import { env } from './env';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: env.postgresUsername,
	password: env.postgresPassword,
	database: 'litboxd',
	entities: [User],
	synchronize: true,
	logging: false, // TODO: log is too large on start up but I would still like to see the logs when running a query, figure out how!!!
});
