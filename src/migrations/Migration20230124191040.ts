import { Migration } from '@mikro-orm/migrations';

export class Migration20230124191040 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" alter column "cover" type text using ("cover"::text);');
    this.addSql('alter table "review" alter column "cover" drop not null;');

    this.addSql('alter table "reading_list" alter column "cover" type text using ("cover"::text);');
    this.addSql('alter table "reading_list" alter column "cover" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" alter column "cover" type text using ("cover"::text);');
    this.addSql('alter table "review" alter column "cover" set not null;');

    this.addSql('alter table "reading_list" alter column "cover" type text using ("cover"::text);');
    this.addSql('alter table "reading_list" alter column "cover" set not null;');
  }

}
