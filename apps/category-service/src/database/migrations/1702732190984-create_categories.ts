import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategories1702732190984 implements MigrationInterface {
  name = 'CreateCategories1702732190984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying(255) NOT NULL, "type" "public"."categories_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_CATEGORY" UNIQUE ("userId", "name", "type"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
