import { Migration } from '@mikro-orm/migrations';

export class Migration20230122001902 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" add column "review_content" text not null, add column "rating" int not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" drop column "review_content";');
    this.addSql('alter table "review" drop column "rating";');
  }

}
