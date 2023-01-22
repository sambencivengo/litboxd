import {
	Collection,
	Entity,
	OneToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { ReadingList } from './ReadingList';
import { Review } from './Review';

@Entity()
export class User {
	@PrimaryKey()
	id!: number;

	@Property({ type: Date, defaultRaw: 'clock_timestamp()' })
	createdAt = new Date();

	@Property({
		type: Date,
		defaultRaw: 'clock_timestamp()',
		onUpdate: () => new Date(),
	})
	updatedAt = new Date();

	@Property({ type: 'text', unique: true })
	username!: string;

	@Property({ type: 'text' })
	password!: string;
	// TODO: add many to one reviews

	@OneToMany(() => Review, (review) => review.user)
	reviews = new Collection<Review>(this);

	@OneToMany(() => ReadingList, (readingList) => readingList.user)
	readingList = new Collection<ReadingList>(this);
}
