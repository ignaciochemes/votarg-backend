import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { ConfigService } from '@nestjs/config';
import * as BodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors({
        allowedHeaders: "*",
        origin: "*"
    });

    app.use(BodyParser.json({ limit: '50mb' }))
    app.use(BodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.setGlobalPrefix('ms-votarg-api');
    await app.listen(configService.get('PORT') || 30000);
}
bootstrap();
