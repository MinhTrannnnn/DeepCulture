import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlaceTable1767947721709 implements MigrationInterface {
    name = 'CreatePlaceTable1767947721709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "place" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "address" character varying(500) NOT NULL, "administrative_unit_id" integer NOT NULL, "latitude" numeric(10,7) NOT NULL, "longitude" numeric(10,7) NOT NULL, "description" text NOT NULL, "historical_significance" text NOT NULL, "visiting_hours" character varying(255), "entry_fee" numeric(10,2), "contact_info" character varying(500), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_795c5e288aeb71a46e0a2a55f3" ON "place" ("latitude", "longitude") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a7c4ed52454f5f90be6734db6" ON "place" ("administrative_unit_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_493d5e591af774a1587d363fb8" ON "place" ("name") `);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "FK_3a7c4ed52454f5f90be6734db60" FOREIGN KEY ("administrative_unit_id") REFERENCES "administrative_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "FK_3a7c4ed52454f5f90be6734db60"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_493d5e591af774a1587d363fb8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a7c4ed52454f5f90be6734db6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_795c5e288aeb71a46e0a2a55f3"`);
        await queryRunner.query(`DROP TABLE "place"`);
    }

}
