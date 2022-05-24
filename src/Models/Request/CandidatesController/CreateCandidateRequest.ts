import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateCandidateRequest {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsNumber()
    @IsNotEmpty()
    public partido: number;

    @IsString()
    @IsNotEmpty()
    public fotoUrl: string;

    @IsString()
    @IsNotEmpty()
    public secretKey: string;
}