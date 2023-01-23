import { Migration } from '@mikro-orm/migrations';

export class Migration20230123200258 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" add constraint "review_book_work_key_unique" unique ("book_work_key");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" drop constraint "review_book_work_key_unique";');
  }

}
