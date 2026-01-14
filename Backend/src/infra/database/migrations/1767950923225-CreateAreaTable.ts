import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAreaTable1767950923225 implements MigrationInterface {
    name = 'CreateAreaTable1767950923225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "area" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "place_id" integer NOT NULL, "area_type" character varying(100) NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d444cd8d9b0a20e555e78f0113" ON "area" ("area_type") `);
        await queryRunner.query(`CREATE INDEX "IDX_eed194ecb2bcc65966a746a2f2" ON "area" ("place_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_644ffaf8fbde4db798cb47712f" ON "area" ("name") `);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_eed194ecb2bcc65966a746a2f25" FOREIGN KEY ("place_id") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_eed194ecb2bcc65966a746a2f25"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_644ffaf8fbde4db798cb47712f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eed194ecb2bcc65966a746a2f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d444cd8d9b0a20e555e78f0113"`);
        await queryRunner.query(`DROP TABLE "area"`);
    }

}
