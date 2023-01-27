import { Migration } from '@mikro-orm/migrations';

export class Migration20230127003129 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" drop constraint "review_user_id_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" add constraint "review_user_id_unique" unique ("user_id");');
  }

}
