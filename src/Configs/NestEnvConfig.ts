export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
    APP_NAME: envs.APP_NAME,
    PORT: parseInt(envs.PORT),
    DATABASE: {
        host: envs.DATABASE_HOST,
        port: parseInt(envs.DATABASE_PORT, 10),
        username: envs.DATABASE_USER,
        password: envs.DATABASE_PASS,
        database: envs.DATABASE_NAME,
        type: envs.DATABASE_TYPE,
        synchronize: envs.DATABASE_SYNC,
        autoLoadEntities: envs.DATABASE_AUTO_LOAD_ENTITIES,
        keepConnectionAlive: true,
    },
    MINIO: {
        endPoint: envs.MINIO_ENDPOINT,
        useSSL: envs.MINIO_USE_SSL,
        accessKey: envs.MINIO_ACCESS_KEY,
        secretKey: envs.MINIO_SECRET_KEY,
    },
    MINIOBUCKET: envs.MINIO_BUCKET,
});