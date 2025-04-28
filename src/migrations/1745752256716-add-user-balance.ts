import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserBalance1745752256716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "user" ("id", "balance") VALUES (1, 10000)`);
        await queryRunner.query(`INSERT INTO "balance_history"("user_id", "action", "amount") VALUES (1, 'CREDIT', 10000)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "balance_history" WHERE user_id = 1`);
        await queryRunner.query(`DELETE FROM "user" WHERE id = 1`);
    }

}
