import { IsNotEmpty, IsString } from "class-validator";

export default class UploadFileRequest {
    @IsNotEmpty()
    @IsString()
    public tag: string;

    @IsNotEmpty()
    @IsString()
    public content: string;
}