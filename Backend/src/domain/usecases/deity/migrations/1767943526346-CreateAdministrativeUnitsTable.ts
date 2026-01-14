import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdministrativeUnitsTable1767943526346 implements MigrationInterface {
    name = 'CreateAdministrativeUnitsTable1767943526346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "administrative_units" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "level" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_97f662b9b848ae0982347d7d1d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0225cfbb67b9fef087017148c5" ON "administrative_units" ("name", "level") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0225cfbb67b9fef087017148c5"`);
        await queryRunner.query(`DROP TABLE "administrative_units"`);
    }

}
