import { Migration } from '@mikro-orm/migrations';

export class Migration20230129205724 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "reading_list" drop constraint "reading_list_book_work_key_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "reading_list" add constraint "reading_list_book_work_key_unique" unique ("book_work_key");');
  }

}
