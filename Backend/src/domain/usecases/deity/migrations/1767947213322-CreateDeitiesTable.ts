import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDeitiesTable1767947213322 implements MigrationInterface {
    name = 'CreateDeitiesTable1767947213322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deities" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "type" character varying(100) NOT NULL, "origin" character varying(255) NOT NULL, "legend" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_acae06178f9341ae3f17e8952f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fa0b28c329050685b3de30b58" ON "deities" ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_6386299a6bf5b8ec1dd2cd323d" ON "deities" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6386299a6bf5b8ec1dd2cd323d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6fa0b28c329050685b3de30b58"`);
        await queryRunner.query(`DROP TABLE "deities"`);
    }

}
