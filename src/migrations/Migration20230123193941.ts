import { Migration } from '@mikro-orm/migrations';

export class Migration20230123193941 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" alter column "review_content" type text using ("review_content"::text);');
    this.addSql('alter table "review" alter column "review_content" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" alter column "review_content" type text using ("review_content"::text);');
    this.addSql('alter table "review" alter column "review_content" set not null;');
  }

}
