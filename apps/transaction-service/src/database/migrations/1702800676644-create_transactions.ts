import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactions1702800676644 implements MigrationInterface {
  name = 'CreateTransactions1702800676644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "walletId" integer NOT NULL, "categoryId" integer NOT NULL, "amount" bigint NOT NULL, "type" "public"."transactions_type_enum" NOT NULL, "date" date NOT NULL, "note" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6bb58f2b6e30cb51a6504599f4" ON "transactions" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a88f466d39796d3081cf96e1b6" ON "transactions" ("walletId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2d5fa024a84dceb158b2b95f34" ON "transactions" ("type") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d66471a99dd3836e1528d39a1e" ON "transactions" ("date") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_TRANSACTION" ON "transactions" ("userId", "walletId", "date", "type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_TRANSACTION"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d66471a99dd3836e1528d39a1e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2d5fa024a84dceb158b2b95f34"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a88f466d39796d3081cf96e1b6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6bb58f2b6e30cb51a6504599f4"`,
    );
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
