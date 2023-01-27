interface BookInfoForSeeder {
	title: string;
	author: string;
	bookWorkKey: string;
	cover: number;
}

export const arrayOfBooks: BookInfoForSeeder[] = [
	{
		title: 'Fantastic Mr Fox',
		author: 'Roald Dahl',
		cover: 6498519,

		bookWorkKey: 'OL45804W',
	},
	{
		title: 'Moby Dick',
		author: 'Herman Melville',
		cover: 8229204,

		bookWorkKey: 'OL102749W',
	},
	{
		title: 'Blood Meridian, or the Evening Redness in the West',
		author: 'Cormac McCarthy',
		cover: 419991,

		bookWorkKey: 'OL40879W',
	},
	{
		title: 'Dune',
		author: 'Frank Herbert',
		cover: 12375564,

		bookWorkKey: 'OL893415W',
	},
	{
		title: 'What I talk about when I talk about running',
		author: 'Haruki Murakami',
		cover: 11579466,
		bookWorkKey: 'OL24809669W',
	},
	{
		title: 'A Distant Mirror',
		author: 'Barbara Wertheim Tuchman',
		cover: 5071195,
		bookWorkKey: 'OL3378547W',
	},
];
