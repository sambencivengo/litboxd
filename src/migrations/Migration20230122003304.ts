import { Migration } from '@mikro-orm/migrations';

export class Migration20230122003304 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "reading_list" ("id" serial primary key, "created_at" timestamptz(0) not null default clock_timestamp(), "updated_at" timestamptz(0) not null default clock_timestamp(), "book_key" text not null, "author" text not null, "user_id" int not null);');

    this.addSql('alter table "reading_list" add constraint "reading_list_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "reading_list" cascade;');
  }

}
