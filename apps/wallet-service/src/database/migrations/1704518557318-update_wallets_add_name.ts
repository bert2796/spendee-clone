import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWalletsAddName1704518557318 implements MigrationInterface {
    name = 'UpdateWalletsAddName1704518557318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" ADD "name" character varying(128) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "name"`);
    }

}
