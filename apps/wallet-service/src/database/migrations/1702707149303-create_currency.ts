import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCurrency1702707149303 implements MigrationInterface {
  name = 'CreateCurrency1702707149303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "currencies" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "code" character varying(3) NOT NULL, "symbol" character varying(10) NOT NULL, CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "currencies"`);
  }
}
