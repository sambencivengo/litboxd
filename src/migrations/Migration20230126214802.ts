import { Migration } from '@mikro-orm/migrations';

export class Migration20230126214802 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" drop constraint "review_book_work_key_unique";');
    this.addSql('alter table "review" add constraint "review_user_id_unique" unique ("user_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" drop constraint "review_user_id_unique";');
    this.addSql('alter table "review" add constraint "review_book_work_key_unique" unique ("book_work_key");');
  }

}
