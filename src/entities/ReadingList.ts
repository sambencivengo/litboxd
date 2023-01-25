import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
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
	bookWorkKey!: string;

	@Property({ type: 'text' })
	author!: string;

	@Property({ type: 'text' })
	title!: string;

	@Property({ type: 'integer', nullable: true })
	cover!: number;

	@ManyToOne({ entity: () => User })
	user: User;
}
