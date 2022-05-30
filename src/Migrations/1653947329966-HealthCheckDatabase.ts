import {MigrationInterface, QueryRunner} from "typeorm";

export class HealthCheckDatabase1653947329966 implements MigrationInterface {
    name = 'HealthCheckDatabase1653947329966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`health_check_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`checker\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`INSERT INTO \`health_check_entity\` (\`id\`, \`checker\`) VALUES (1, true)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`health_check_entity\``);
    }

}
