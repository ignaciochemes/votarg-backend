import {MigrationInterface, QueryRunner} from "typeorm";

export class IpRegistry1653956418843 implements MigrationInterface {
    name = 'IpRegistry1653956418843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ip_registry_entity\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`ip_registry_entity\` ADD \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`ip_registry_entity\` ADD \`delete_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`ip_registry_entity\` ADD \`vote\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ip_registry_entity\` DROP COLUMN \`vote\``);
        await queryRunner.query(`ALTER TABLE \`ip_registry_entity\` DROP COLUMN \`delete_at\``);
        await queryRunner.query(`ALTER TABLE \`ip_registry_entity\` DROP COLUMN \`update_at\``);
        await queryRunner.query(`ALTER TABLE \`ip_registry_entity\` DROP COLUMN \`created_at\``);
    }

}
