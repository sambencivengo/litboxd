import { Migration } from '@mikro-orm/migrations';

export class Migration20230120194803 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default clock_timestamp(), "updated_at" timestamptz(0) not null default clock_timestamp(), "username" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "review" ("id" serial primary key, "created_at" timestamptz(0) not null default clock_timestamp(), "updated_at" timestamptz(0) not null default clock_timestamp(), "title" text not null, "description" text not null, "likes" int not null default 0, "user_id" int not null);');

    this.addSql('alter table "review" add constraint "review_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
