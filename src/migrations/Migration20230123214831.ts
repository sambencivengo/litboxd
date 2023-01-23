import { Migration } from '@mikro-orm/migrations';

export class Migration20230123214831 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default clock_timestamp(), "updated_at" timestamptz(0) not null default clock_timestamp(), "username" text not null, "password" text not null);'
		);
		this.addSql(
			'alter table "user" add constraint "user_username_unique" unique ("username");'
		);

		this.addSql(
			'create table "review" ("id" serial primary key, "created_at" timestamptz(0) not null default clock_timestamp(), "updated_at" timestamptz(0) not null default clock_timestamp(), "review_content" text null, "book_work_key" text not null, "author" text not null, "title" text not null, "cover" text not null, "rating" int not null default 0, "likes" int not null default 0, "user_id" int not null);'
		);
		this.addSql(
			'alter table "review" add constraint "review_book_work_key_unique" unique ("book_work_key");'
		);

		this.addSql(
			'create table "reading_list" ("id" serial primary key, "created_at" timestamptz(0) not null default clock_timestamp(), "updated_at" timestamptz(0) not null default clock_timestamp(), "book_work_key" text not null, "author" text not null, "title" text not null, "cover" text not null, "user_id" int not null);'
		);
		this.addSql(
			'alter table "reading_list" add constraint "reading_list_book_work_key_unique" unique ("book_work_key");'
		);

		this.addSql(
			'alter table "review" add constraint "review_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
		);

		this.addSql(
			'alter table "reading_list" add constraint "reading_list_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
		);
	}

	async down(): Promise<void> {
		this.addSql(
			'alter table "review" drop constraint "review_user_id_foreign";'
		);

		this.addSql(
			'alter table "reading_list" drop constraint "reading_list_user_id_foreign";'
		);

		this.addSql('drop table if exists "user" cascade;');

		this.addSql('drop table if exists "review" cascade;');

		this.addSql('drop table if exists "reading_list" cascade;');
	}
}
