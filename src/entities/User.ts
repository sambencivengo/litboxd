import { Field, ID } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './Review';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: number;

	@Column({ type: 'varchar', unique: true })
	@Field()
	username: string;

	@Column('varchar')
	@Field()
	password: string;
	// TODO: add many to one reviews

	@OneToMany(() => Review, (review) => review.user)
	reviews: Review[];
}
