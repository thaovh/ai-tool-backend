import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1744772402240 implements MigrationInterface {
    name = 'InitialMigration1744772402240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_fine_tune_data_created_by"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_fine_tune_data_updated_by"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_email"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_phone_number"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fine_tune_data_created_by"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fine_tune_data_updated_by"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD "is_checked" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD "created_by_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD "updated_by_id" uuid`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."tbl_user_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "role" TYPE "public"."tbl_user_role_enum" USING "role"::"text"::"public"."tbl_user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "role" SET DEFAULT 'USER'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum" RENAME TO "user_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."tbl_user_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" TYPE "public"."tbl_user_status_enum" USING "status"::"text"::"public"."tbl_user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD CONSTRAINT "FK_61aa53c3ae874b66f1448b58b33" FOREIGN KEY ("created_by_id") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD CONSTRAINT "FK_1998671caeaf4493c7e0cf09efb" FOREIGN KEY ("updated_by_id") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_1998671caeaf4493c7e0cf09efb"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_61aa53c3ae874b66f1448b58b33"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum_old" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" TYPE "public"."user_status_enum_old" USING "status"::"text"::"public"."user_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."tbl_user_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum_old" RENAME TO "user_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "role" SET DEFAULT 'USER'`);
        await queryRunner.query(`DROP TYPE "public"."tbl_user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP COLUMN "updated_by_id"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP COLUMN "created_by_id"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP COLUMN "is_checked"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD "updated_by" uuid`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD "created_by" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_fine_tune_data_updated_by" ON "tbl_fine_tune_data" ("updated_by") `);
        await queryRunner.query(`CREATE INDEX "IDX_fine_tune_data_created_by" ON "tbl_fine_tune_data" ("created_by") `);
        await queryRunner.query(`CREATE INDEX "IDX_user_phone_number" ON "tbl_user" ("phone_number") `);
        await queryRunner.query(`CREATE INDEX "IDX_user_email" ON "tbl_user" ("email") `);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD CONSTRAINT "FK_fine_tune_data_updated_by" FOREIGN KEY ("updated_by") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD CONSTRAINT "FK_fine_tune_data_created_by" FOREIGN KEY ("created_by") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
