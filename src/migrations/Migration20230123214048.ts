import { Migration } from '@mikro-orm/migrations';

export class Migration20230123214048 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" add column "title" text not null, add column "cover" text not null;');
    this.addSql('alter table "review" rename column "book_author" to "author";');

    this.addSql('alter table "reading_list" add column "book_work_key" text not null, add column "title" text not null;');
    this.addSql('alter table "reading_list" drop constraint "reading_list_book_key_unique";');
    this.addSql('alter table "reading_list" drop column "book_key";');
    this.addSql('alter table "reading_list" drop column "book_title";');
    this.addSql('alter table "reading_list" add constraint "reading_list_book_work_key_unique" unique ("book_work_key");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" add column "book_author" text not null;');
    this.addSql('alter table "review" drop column "author";');
    this.addSql('alter table "review" drop column "title";');
    this.addSql('alter table "review" drop column "cover";');

    this.addSql('alter table "reading_list" add column "book_key" text not null, add column "book_title" text not null;');
    this.addSql('alter table "reading_list" drop constraint "reading_list_book_work_key_unique";');
    this.addSql('alter table "reading_list" drop column "book_work_key";');
    this.addSql('alter table "reading_list" drop column "title";');
    this.addSql('alter table "reading_list" add constraint "reading_list_book_key_unique" unique ("book_key");');
  }

}
