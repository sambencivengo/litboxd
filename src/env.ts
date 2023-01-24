import setEnv from '@americanairlines/simple-env';
import { config } from 'dotenv-flow';

config();

export const env = setEnv({
	required: {},
	optional: {
		nodeEnv: 'NODE_ENV',
		websiteUrl: 'WEBSITE_URL',
		postgresUsername: 'POSTGRES_USERNAME',
		postgresPassword: 'POSTGRES_PASSWORD',
		cookieName: 'COOKIE_NAME',
		cookieSecret: 'COOKIE_SECRET',
	},
});
