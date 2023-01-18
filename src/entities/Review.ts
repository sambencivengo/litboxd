import { Field, ID } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Review {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: number;

	@Column({ type: 'varchar' })
	@Field()
	title: string;

	@Column('varchar')
	@Field()
	description: string;

	@Column({ type: 'int', default: 0 })
	@Field()
	likes: number;

	@ManyToOne(() => User, (user) => user.reviews)
	user: User;
}
