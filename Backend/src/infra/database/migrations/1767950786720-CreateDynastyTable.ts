import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDynastyTable1767950786720 implements MigrationInterface {
    name = 'CreateDynastyTable1767950786720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dynasty" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "start_year" integer NOT NULL, "end_year" integer, "capital" character varying(255) NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e54c32ac3cb0b989b3659333f1e" UNIQUE ("name"), CONSTRAINT "PK_87b79735bcb8faf77b962db4a31" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0727b55cf69c745b06488fd072" ON "dynasty" ("start_year") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e54c32ac3cb0b989b3659333f1" ON "dynasty" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e54c32ac3cb0b989b3659333f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0727b55cf69c745b06488fd072"`);
        await queryRunner.query(`DROP TABLE "dynasty"`);
    }

}
