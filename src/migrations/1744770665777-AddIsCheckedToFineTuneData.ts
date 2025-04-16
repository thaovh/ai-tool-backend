import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsCheckedToFineTuneData1744770665777 implements MigrationInterface {
    name = 'AddIsCheckedToFineTuneData1744770665777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" ADD "is_checked" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_fine_tune_data" DROP COLUMN "is_checked"`);
    }
}
