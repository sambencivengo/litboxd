import {
	Entity,
	ManyToOne,
	IdentifiedReference,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class Review {
	@PrimaryKey()
	id: number;

	@Property({ type: Date, defaultRaw: 'clock_timestamp()' })
	createdAt = new Date();

	@Property({
		type: Date,
		defaultRaw: 'clock_timestamp()',
		onUpdate: () => new Date(),
	})
	updatedAt = new Date();

	@Property({ type: 'text' })
	title: string;

	@Property({ type: 'text' })
	description: string;

	@Property({ type: 'integer', default: 0 })
	likes: number;

	@ManyToOne({ entity: () => User })
	user: IdentifiedReference<User>;
}
