import 'reflect-metadata';
import express from 'express';
import next from 'next';
import cors from 'cors';
import { env } from './env';
import { api } from './api';
import { AppDataSource } from './connectDb';
import { User } from './entities/User';

console.log(`Node environment: ${env.nodeEnv}`);
const port = process.env.PORT || 3000;
const dev = env.nodeEnv !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
	.then(async () => {
		// Connect DB
		AppDataSource.initialize()
			.then(() => {
				console.log(
					'Data source initialized and database is connected'
				);
			})
			.catch((error) =>
				console.log(
					`Unable to connect to the data source and database: ${error}`
				)
			);

		const server = express();

		const user = new User();
		user.username = 'sammy';
		user.password = 'password';

		const userRepo = AppDataSource.getRepository(User);
		await userRepo.save(user);

		console.log('User has been saved. User id is', user.id);

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
