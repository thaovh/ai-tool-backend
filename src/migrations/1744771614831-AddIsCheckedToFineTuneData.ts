import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsCheckedToFineTuneData1744771614831 implements MigrationInterface {
    name = 'AddIsCheckedToFineTuneData1744771614831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Đổi tên cột created_by thành created_by_id
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" RENAME COLUMN "created_by" TO "created_by_id"`);

        // Đổi tên cột updated_by thành updated_by_id
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" RENAME COLUMN "updated_by" TO "updated_by_id"`);

        // Thêm cột is_checked
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD "is_checked" boolean NOT NULL DEFAULT false`);

        // Cập nhật lại foreign key constraints
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT IF EXISTS "FK_fine_tune_data_created_by"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT IF EXISTS "FK_fine_tune_data_updated_by"`);

        await queryRunner.query(`
            ALTER TABLE "tbl_fine_tune_data"
            ADD CONSTRAINT "FK_fine_tune_data_created_by_id"
            FOREIGN KEY ("created_by_id")
            REFERENCES "tbl_user"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "tbl_fine_tune_data"
            ADD CONSTRAINT "FK_fine_tune_data_updated_by_id"
            FOREIGN KEY ("updated_by_id")
            REFERENCES "tbl_user"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa cột is_checked
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP COLUMN "is_checked"`);

        // Xóa foreign key constraints
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT IF EXISTS "FK_fine_tune_data_created_by_id"`);
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP CONSTRAINT IF EXISTS "FK_fine_tune_data_updated_by_id"`);

        // Đổi tên cột created_by_id thành created_by
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" RENAME COLUMN "created_by_id" TO "created_by"`);

        // Đổi tên cột updated_by_id thành updated_by
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" RENAME COLUMN "updated_by_id" TO "updated_by"`);

        // Thêm lại foreign key constraints cũ
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
    }
}
