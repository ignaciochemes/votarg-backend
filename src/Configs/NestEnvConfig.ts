export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
    APP_NAME: process.env.APP_NAME,
    PORT: parseInt(process.env.PORT),
    DATABASE: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        type: process.env.DATABASE_TYPE,
        synchronize: process.env.DATABASE_SYNC,
        autoLoadEntities: process.env.DATABASE_AUTO_LOAD_ENTITIES,
        keepConnectionAlive: true,
    },
    MINIO: {
        endPoint: process.env.MINIO_ENDPOINT,
        useSSL: false,
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey: process.env.MINIO_SECRET_KEY,
    },
    MINIOBUCKET: process.env.MINIO_BUCKET,
});