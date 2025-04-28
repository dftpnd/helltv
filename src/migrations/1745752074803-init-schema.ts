import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1745752074803 implements MigrationInterface {
    name = 'InitSchema1745752074803'

    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "balance_history" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "action" "public"."balance_history_action_enum" NOT NULL, "amount" numeric(10,2) NOT NULL, "ts" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dc0b0a31a6896d2e4fd3f08042c" PRIMARY KEY ("id"))
        `);
        await queryRunner.query(`
            CREATE TABLE "user" ("id" SERIAL NOT NULL, "balance" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))
        `);
        await queryRunner.query(`ALTER TABLE "balance_history" ADD CONSTRAINT "FK_0a1b904300675176db553c4cb96" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance_history" DROP CONSTRAINT "FK_0a1b904300675176db553c4cb96"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "balance_history"`);
    }

}
