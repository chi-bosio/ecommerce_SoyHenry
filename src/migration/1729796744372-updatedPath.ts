import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedPath1729796744372 implements MigrationInterface {
    name = 'UpdatedPath1729796744372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "orderDetails" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "updateAt" TO "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "orderDetails" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "updatedAt" TO "updateAt"`);
    }

}
