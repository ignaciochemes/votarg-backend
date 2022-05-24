import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1652550058660 implements MigrationInterface {
    name = 'UserMigration1652550058660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`ip\` varchar(255) NOT NULL, \`userAgent\` varchar(255) NOT NULL, \`osName\` varchar(255) NOT NULL, \`osPlatform\` varchar(255) NOT NULL, \`browserName\` varchar(255) NOT NULL, \`deviceType\` varchar(255) NOT NULL, \`deviceBrand\` varchar(255) NOT NULL, \`deviceModel\` varchar(255) NOT NULL, INDEX \`IDX_b89d1c9e55e306904fec32aa07\` (\`ip\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b89d1c9e55e306904fec32aa07\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
