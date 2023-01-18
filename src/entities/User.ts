import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './Review';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', unique: true })
	username: string;

	@Column('varchar')
	password: string;
	// TODO: add many to one reviews

	@OneToMany(() => Review, (review) => review.user)
	reviews: Review[];
}
