import { Migration } from '@mikro-orm/migrations';

export class Migration20230124191814 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "reading_list" alter column "cover" type int using ("cover"::int);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "reading_list" alter column "cover" type text using ("cover"::text);');
  }

}
