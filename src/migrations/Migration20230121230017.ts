import { Migration } from '@mikro-orm/migrations';

export class Migration20230121230017 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" drop column "title";');
    this.addSql('alter table "review" drop column "description";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" add column "title" text not null, add column "description" text not null;');
  }

}
