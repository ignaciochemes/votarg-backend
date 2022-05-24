const Dotenv = require('dotenv');
const path = require('path');
const EnvConfiguration = require("./src/Configs/EnvFilePathConfig");
const NestEnvConfiguration = require('./src/Configs/NestEnvConfig');
const { ModulesContainer } = require('@nestjs/core');

let envData = Dotenv.config({ path: `${path.join(__dirname)}/${EnvConfiguration.envFilePathConfiguration()}` }).parsed;
console.log(`\u001b[36mTYPEORM ENVIRONMENT: ${process.env.REG}\nDATABASE CONNECTION: ${envData.DATABASE_HOST}\u001b[39m`);
let envs = NestEnvConfiguration.envModelTransformer(envData);
module.exports = {
    ...envs.DATABASE,
    migrations: ["src/Migrations/*.{ts,js}"],
    entities: ["src/Models/Entities/**/*.{ts,js}"],
    cli: {
        entitiesDir: "src/Models/Entities",
        migrationsDir: "src/Migrations"
    }
};
