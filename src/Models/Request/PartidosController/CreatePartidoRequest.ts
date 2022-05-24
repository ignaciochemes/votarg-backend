import { IsNotEmpty, IsString } from "class-validator";

export default class CreatePartidoRequest {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public logoTag: string;

    @IsString()
    @IsNotEmpty()
    public logoContent: string;

    @IsString()
    @IsNotEmpty()
    public secretKey: string;
}