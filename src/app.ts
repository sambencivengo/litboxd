import 'reflect-metadata';
import express from 'express';
import next from 'next';
import cors from 'cors';
import { env } from './env';
import { api } from './api';
import { User } from './entities/User';
import { appDataSource } from './ormConfig';

console.log(`Node environment: ${env.nodeEnv}`);
const port = process.env.PORT || 3000;
const dev = env.nodeEnv !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

appDataSource
	.initialize()
	.then(() => {
		console.log(`Data Source has been initialized`);

		app.prepare()
			.then(async () => {
				const server = express();

				server.use(
					cors({
						credentials: true,
						origin: env.websiteUrl,
					})
				);

				server.use('/api', api);

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
	})
	.catch((err) => {
		console.error(`Data Source initialization error`, err);
	});
