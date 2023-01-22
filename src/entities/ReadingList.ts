import {
	Entity,
	ManyToOne,
	IdentifiedReference,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class ReadingList {
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

	@Property({ type: 'text', unique: true })
	bookKey!: string;

	@Property({ type: 'text' })
	author!: string;

	@ManyToOne({ entity: () => User })
	user: IdentifiedReference<User>;
}
