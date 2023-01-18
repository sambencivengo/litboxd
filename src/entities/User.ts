import { Field, ID } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
