import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSwagger1729813545111 implements MigrationInterface {
    name = 'AddSwagger1729813545111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    }

}
