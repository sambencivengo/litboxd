import type { EntityManager } from '@mikro-orm/core';
import { Seeder, faker } from '@mikro-orm/seeder';
import { Review } from '../entities';
import { arrayOfBooks } from './BookInfoForSeeder';
import { UserFactory } from './factories/UserFactory';

const NUM_USERS = 15;
const NUM_REVIEWS = 30;
const NUM_READING_LIST = 30;

export const reviewCombos = [
	{
		rating: 1,
		reviewContent: 'One of the worst books I have ever read! No thanks!',
	},
	{
		rating: 5,
		reviewContent:
			'A must read! This book is an essential part of any library.',
	},
	{
		rating: 3,
		reviewContent: 'It was alright.',
	},
	{
		rating: 4,
		reviewContent: 'Really enjoyed this one. Happy I picked it up.',
	},
	{
		rating: 4,
		reviewContent: 'Another knockout. They never miss!',
	},
	{
		rating: 2,
		reviewContent: 'Meh',
	},
	{
		rating: 1,
		reviewContent: 'You call this a book?',
	},
	{
		rating: 5,
		reviewContent: 'Fantastic! What a ride.',
	},
	{
		rating: 2,
		reviewContent:
			'There are better ways to spend your time than reading this, at least it was quick.',
	},
];

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const users = new UserFactory(em).make(NUM_USERS);

		users.forEach((user) => {
			arrayOfBooks.forEach((book) => {
				em.create(Review, {
					author: book.author,
					title: book.title,
					cover: book.cover,
					rating: reviewCombos[
						Math.floor(Math.random() * reviewCombos.length)
					].rating,
					reviewContent:
						reviewCombos[
							Math.floor(Math.random() * reviewCombos.length)
						].reviewContent,
					bookWorkKey: book.bookWorkKey,
					user: user,
				});
			});
		});
	}
}
