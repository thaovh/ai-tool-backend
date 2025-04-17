import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1744772402240 implements MigrationInterface {
    name = 'InitialMigration1744772402240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table
        await queryRunner.query(`
            CREATE TABLE "tbl_user" (
                "id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" character varying NOT NULL DEFAULT 'user',
                "refresh_token" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_tbl_user_email" UNIQUE ("email"),
                CONSTRAINT "PK_tbl_user" PRIMARY KEY ("id")
            )
        `);

        // Create fine_tune_data table
        await queryRunner.query(`
            CREATE TABLE "tbl_fine_tune_data" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" text,
                "status" character varying NOT NULL DEFAULT 'pending',
                "is_checked" boolean NOT NULL DEFAULT false,
                "created_by_id" integer,
                "updated_by_id" integer,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_tbl_fine_tune_data" PRIMARY KEY ("id")
            )
        `);

        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "tbl_fine_tune_data" 
            ADD CONSTRAINT "FK_tbl_fine_tune_data_created_by" 
            FOREIGN KEY ("created_by_id") 
            REFERENCES "tbl_user"("id") 
            ON DELETE SET NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "tbl_fine_tune_data" 
            ADD CONSTRAINT "FK_tbl_fine_tune_data_updated_by" 
            FOREIGN KEY ("updated_by_id") 
            REFERENCES "tbl_user"("id") 
            ON DELETE SET NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "tbl_fine_tune_data" 
            DROP CONSTRAINT "FK_tbl_fine_tune_data_updated_by"
        `);

        await queryRunner.query(`
            ALTER TABLE "tbl_fine_tune_data" 
            DROP CONSTRAINT "FK_tbl_fine_tune_data_created_by"
        `);

        // Drop tables
        await queryRunner.query(`DROP TABLE "tbl_fine_tune_data"`);
        await queryRunner.query(`DROP TABLE "tbl_user"`);
    }
}
