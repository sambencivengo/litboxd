import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Review {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar' })
	title: string;

	@Column('varchar')
	description: string;

	@Column({ type: 'int', default: 0 })
	likes: number;

	@ManyToOne(() => User, (user) => user.reviews)
	user: User;
}
