import { Migration } from '@mikro-orm/migrations';

export class Migration20230122013257 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "reading_list" add constraint "reading_list_book_key_unique" unique ("book_key");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "reading_list" drop constraint "reading_list_book_key_unique";');
  }

}
