import 'reflect-metadata';
import express from 'express';
import next from 'next';
import cors from 'cors';
import { env } from './env';
import createMemoryStore from 'memorystore';
import session from 'express-session';
import { api } from './api/routes';
import {
	EntityManager,
	MikroORM,
	PostgreSqlDriver,
} from '@mikro-orm/postgresql';
import mikroOrmConfig from './mikro-orm.config';

console.log(`Node environment: ${env.nodeEnv}`);
const port = process.env.PORT || 3000;
const dev = env.nodeEnv !== 'production';
const MemoryStore = createMemoryStore(session);
const app = next({ dev });
const handle = app.getRequestHandler();

const main = async () => {
	try {
		console.log(`Data Source has been initialized`);

		const orm = await MikroORM.init(mikroOrmConfig);
		await orm.getMigrator().up(); // WARN: Migrations: if table conflicts happen on app start up, comment out and debug

		const includeEntityManager: express.Handler = (req, _res, next) => {
			req.em = orm.em.fork() as EntityManager<PostgreSqlDriver>;
			next();
		};
		app.prepare()
			.then(async () => {
				const server = express();

				server.use(
					cors({
						credentials: true,
						origin: env.websiteUrl,
					})
				);

				server.use(
					session({
						store: new MemoryStore({
							checkPeriod: 86400000,
						}),
						name: env.cookieName,
						cookie: {
							maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
							httpOnly: false,
							sameSite: 'lax', // csrf
							secure: false,
						},
						saveUninitialized: false,
						secret: env.cookieSecret,
						resave: true,
					})
				);

				server.use(express.json());

				server.use('/api', includeEntityManager, api);

				server.get('/*', (req, res) => {
					return handle(req, res);
				});

				server.listen(port, () => {
					console.log(
						`Server is listening on PORT:http://localhost:${port}/`
					);
				});
			})
			.catch((error) => {
				console.error(`App has crashed: ${error}`);
			});
	} catch (error) {
		console.log(error);
	}
};

main();
