import setEnv from '@americanairlines/simple-env';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const env = setEnv({
	required: {},
	optional: {
		nodeEnv: 'NODE_ENV',
		websiteUrl: 'WEBSITE_URL',
		postgresUsername: 'POSTGRES_USERNAME',
		postgresPassword: 'POSTGRES_PASSWORD',
		cookieName: 'COOKIE_NAME',
		dbName: 'DB_NAME',
		cookieSecret: 'COOKIE_SECRET',
	},
});
