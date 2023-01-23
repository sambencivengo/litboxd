import { Migration } from '@mikro-orm/migrations';

export class Migration20230123174518 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" add column "book_work_key" text not null, add column "book_author" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" drop column "book_work_key";');
    this.addSql('alter table "review" drop column "book_author";');
  }

}
