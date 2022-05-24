import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1652484735264 implements MigrationInterface {
    name = 'FirstMigration1652484735264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`partidos\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`votos\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`secret_key\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidate\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`votos\` int NOT NULL, \`foto_url\` varchar(255) NOT NULL, \`partido_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`candidate\` ADD CONSTRAINT \`FK_dcc1fdb61a2f2713ca1b978961c\` FOREIGN KEY (\`partido_id\`) REFERENCES \`partidos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidate\` DROP FOREIGN KEY \`FK_dcc1fdb61a2f2713ca1b978961c\``);
        await queryRunner.query(`DROP TABLE \`candidate\``);
        await queryRunner.query(`DROP TABLE \`secret_key\``);
        await queryRunner.query(`DROP TABLE \`partidos\``);
    }

}
