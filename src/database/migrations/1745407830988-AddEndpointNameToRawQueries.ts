import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEndpointNameToRawQueries1745407830988 implements MigrationInterface {
    name = 'AddEndpointNameToRawQueries1745407830988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP CONSTRAINT "FK_e017a386cbf7f63c78d7d44f649"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP CONSTRAINT "FK_5a3415bc83123011a2343547618"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_fine_tune_data_created_by"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_fine_tune_data_updated_by"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_email"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_phone_number"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fine_tune_data_created_by"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fine_tune_data_updated_by"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD "endpoint_name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD CONSTRAINT "UQ_aba3d7687c24f9ebdee12951001" UNIQUE ("endpoint_name")`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD "deletedAt" TIMESTAMP`);
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
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD CONSTRAINT "FK_e017a386cbf7f63c78d7d44f649" FOREIGN KEY ("created_by") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD CONSTRAINT "FK_5a3415bc83123011a2343547618" FOREIGN KEY ("updated_by") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD CONSTRAINT "FK_2d363c097f3f9a42b8b36881b04" FOREIGN KEY ("created_by") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD CONSTRAINT "FK_6f8291cb9a4cc84bbf75d479a4c" FOREIGN KEY ("updated_by") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_6f8291cb9a4cc84bbf75d479a4c"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT "FK_2d363c097f3f9a42b8b36881b04"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP CONSTRAINT "FK_5a3415bc83123011a2343547618"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP CONSTRAINT "FK_e017a386cbf7f63c78d7d44f649"`);
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
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP CONSTRAINT "UQ_aba3d7687c24f9ebdee12951001"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" DROP COLUMN "endpoint_name"`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`CREATE INDEX "IDX_fine_tune_data_updated_by" ON "tbl_fine_tune_data" ("updated_by") `);
        await queryRunner.query(`CREATE INDEX "IDX_fine_tune_data_created_by" ON "tbl_fine_tune_data" ("created_by") `);
        await queryRunner.query(`CREATE INDEX "IDX_user_phone_number" ON "tbl_user" ("phone_number") `);
        await queryRunner.query(`CREATE INDEX "IDX_user_email" ON "tbl_user" ("email") `);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD CONSTRAINT "FK_fine_tune_data_updated_by" FOREIGN KEY ("updated_by") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD CONSTRAINT "FK_fine_tune_data_created_by" FOREIGN KEY ("created_by") REFERENCES "tbl_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD CONSTRAINT "FK_5a3415bc83123011a2343547618" FOREIGN KEY ("updated_by") REFERENCES "tbl_user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "raw_queries" ADD CONSTRAINT "FK_e017a386cbf7f63c78d7d44f649" FOREIGN KEY ("created_by") REFERENCES "tbl_user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
