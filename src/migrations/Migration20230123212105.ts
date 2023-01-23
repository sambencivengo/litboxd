import { Migration } from '@mikro-orm/migrations';

export class Migration20230123212105 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "reading_list" add column "book_title" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "reading_list" drop column "book_title";');
  }

}
