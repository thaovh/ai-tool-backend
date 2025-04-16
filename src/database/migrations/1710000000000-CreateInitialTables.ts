import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1710000000000 implements MigrationInterface {
  name = 'CreateInitialTables1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TYPE "public"."user_role_enum" AS ENUM ('ADMIN', 'USER')
    `);

    await queryRunner.query(`
      CREATE TYPE "public"."user_status_enum" AS ENUM ('ACTIVE', 'INACTIVE')
    `);

    await queryRunner.query(`
      CREATE TABLE "tbl_user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "first_name" character varying(100) NOT NULL,
        "last_name" character varying(100) NOT NULL,
        "email" character varying NOT NULL,
        "phone_number" character varying(20) NOT NULL,
        "password" character varying NOT NULL,
        "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER',
        "status" "public"."user_status_enum" NOT NULL DEFAULT 'ACTIVE',
        "refresh_token" character varying,
        CONSTRAINT "UQ_user_email" UNIQUE ("email"),
        CONSTRAINT "UQ_user_phone_number" UNIQUE ("phone_number"),
        CONSTRAINT "PK_user" PRIMARY KEY ("id")
      )
    `);

    // Create fine-tune data table
    await queryRunner.query(`
      CREATE TABLE "tbl_fine_tune_data" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "prompt" text NOT NULL,
        "response" text NOT NULL,
        "created_by" uuid NOT NULL,
        "updated_by" uuid,
        CONSTRAINT "PK_fine_tune_data" PRIMARY KEY ("id")
      )
    `);

    // Add foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "tbl_fine_tune_data"
      ADD CONSTRAINT "FK_fine_tune_data_created_by"
      FOREIGN KEY ("created_by")
      REFERENCES "tbl_user"("id")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "tbl_fine_tune_data"
      ADD CONSTRAINT "FK_fine_tune_data_updated_by"
      FOREIGN KEY ("updated_by")
      REFERENCES "tbl_user"("id")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
    `);

    // Create indexes
    await queryRunner.query(`
      CREATE INDEX "IDX_user_email" ON "tbl_user" ("email")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_phone_number" ON "tbl_user" ("phone_number")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_fine_tune_data_created_by" ON "tbl_fine_tune_data" ("created_by")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_fine_tune_data_updated_by" ON "tbl_fine_tune_data" ("updated_by")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX "IDX_fine_tune_data_updated_by"`);
    await queryRunner.query(`DROP INDEX "IDX_fine_tune_data_created_by"`);
    await queryRunner.query(`DROP INDEX "IDX_user_phone_number"`);
    await queryRunner.query(`DROP INDEX "IDX_user_email"`);

    // Drop foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_fine_tune_data_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_fine_tune_data_created_by"`,
    );

    // Drop tables
    await queryRunner.query(`DROP TABLE "tbl_fine_tune_data"`);
    await queryRunner.query(`DROP TABLE "tbl_user"`);

    // Drop enums
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
