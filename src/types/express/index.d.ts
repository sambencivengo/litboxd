import { User } from '../../entities';
// to make the file a module and avoid the TypeScript error

declare global {
	namespace Express {
		export interface Request {
			user: User;
		}
	}
}
