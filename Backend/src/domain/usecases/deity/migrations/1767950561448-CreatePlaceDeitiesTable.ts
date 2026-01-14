import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlaceDeitiesTable1767950561448 implements MigrationInterface {
    name = 'CreatePlaceDeitiesTable1767950561448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "place_deities" ("id" SERIAL NOT NULL, "place_id" integer NOT NULL, "deity_id" integer NOT NULL, "worship_type" character varying(100) NOT NULL, "significance_level" character varying(50) NOT NULL, "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e6048bb09f758938a6d271c8d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec854926151621444de45f0baf" ON "place_deities" ("deity_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ebd0c6b9332d539c2d9e38cbc8" ON "place_deities" ("place_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_4e8fc04219cafa823e6171fc09" ON "place_deities" ("place_id", "deity_id") `);
        await queryRunner.query(`ALTER TABLE "place_deities" ADD CONSTRAINT "FK_ebd0c6b9332d539c2d9e38cbc8f" FOREIGN KEY ("place_id") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place_deities" ADD CONSTRAINT "FK_ec854926151621444de45f0baf0" FOREIGN KEY ("deity_id") REFERENCES "deities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place_deities" DROP CONSTRAINT "FK_ec854926151621444de45f0baf0"`);
        await queryRunner.query(`ALTER TABLE "place_deities" DROP CONSTRAINT "FK_ebd0c6b9332d539c2d9e38cbc8f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e8fc04219cafa823e6171fc09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ebd0c6b9332d539c2d9e38cbc8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ec854926151621444de45f0baf"`);
        await queryRunner.query(`DROP TABLE "place_deities"`);
    }

}
