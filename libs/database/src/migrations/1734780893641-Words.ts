import { MigrationInterface, QueryRunner } from "typeorm";

export class Words1734780893641 implements MigrationInterface {
    name = 'Words1734780893641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "words" ("id" SERIAL NOT NULL, "word" character varying(255) NOT NULL, "occurrences" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "words"`);
    }

}
