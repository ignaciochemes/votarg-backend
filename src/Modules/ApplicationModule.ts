import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { importAllFromRequireContext } from "src/Helpers/Utilities/RequireContext";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            importAllFromRequireContext(
                require.context('../Models/Entities', true, /Entity\.ts$/),
            ),
        ),
    ],
    providers: [
        ...importAllFromRequireContext(require.context('../Services', true, /\.ts$/)),
        ...importAllFromRequireContext(require.context('../Dao', true, /\.ts$/)),
        ...importAllFromRequireContext(require.context('../WebServices/', true, /\.ts$/)),
    ],
    controllers: [
        ...importAllFromRequireContext(require.context('../Controllers', true, /\.ts$/))
    ],
    exports: [TypeOrmModule],
})
export class ApplicationModule { }