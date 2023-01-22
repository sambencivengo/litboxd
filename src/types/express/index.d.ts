import type {
	EntityManager,
	SqlEntityManager,
	PostgreSqlDriver,
	IDatabaseDriver,
} from '@mikro-orm/postgresql';
import { SimpleUser } from '../SimpleUser';

declare global {
	namespace Express {
		export interface Request {
			user: SimpleUser;
			em: EntityManager<PostgreSqlDriver>;
		}
	}
}
