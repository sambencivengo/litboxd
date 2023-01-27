import * as argon2 from 'argon2';
import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from '../../entities';

export class UserFactory extends Factory<User> {
	model = User;

	definition = (faker: Faker): Partial<User> => {
		const username = faker.name.firstName().toLowerCase();

		return {
			username,
			password: 'as;ojnas;dkjn121231233asd',
		};
	};
}
