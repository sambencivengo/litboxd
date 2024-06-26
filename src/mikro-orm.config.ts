import { MikroORM } from '@mikro-orm/postgresql';
import path from 'path';
import { env } from './env';

export default {
	migrations: {
		path: path.join(__dirname, './migrations'), // path to the folder with migrations,
		glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
		wrap: false,
		disableForeignKeys: false,
	},
	dbName: env.dbName,
	entities: ['./src/entities/**/*.ts'], // Any new entities must be added here
	// debug: !__prod__,
	type: 'postgresql',
	clientUrl: env.pgClientURL,
	allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
