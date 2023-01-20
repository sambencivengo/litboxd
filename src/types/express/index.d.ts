import { User } from '../../entities';
import type {
	EntityManager,
	SqlEntityManager,
	PostgreSqlDriver,
	IDatabaseDriver,
} from '@mikro-orm/postgresql';

declare global {
	namespace Express {
		export interface Request {
			user: User;
			em: EntityManager<PostgreSqlDriver>;
		}
	}
}
