import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWallets1702710416396 implements MigrationInterface {
    name = 'CreateWallets1702710416396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallets" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "currencyId" integer, CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_57ced1bbf241ff1451bb2ccfddf" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_57ced1bbf241ff1451bb2ccfddf"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
    }

}
