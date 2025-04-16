import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnableUUIDExtension1710499999999 implements MigrationInterface {
  name = 'EnableUUIDExtension1710499999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
