import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { RealIP } from "nestjs-real-ip";
import Response from "src/Helpers/Formatter/Response";
import { BufferedFile } from "src/Models/File/FileModel";
import CreatePartidoRequest from "src/Models/Request/PartidosController/CreatePartidoRequest";
import { PartidosService } from "src/Services/PartidosService";

@Controller('partidos')
export class PartidosController {
    constructor(private readonly _partidosService: PartidosService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() partido: CreatePartidoRequest,
        @UploadedFile() image: BufferedFile
    ): Promise<Response<any>> {
        const response = await this._partidosService.create(partido, image);
        return Response.create<any>(response);
    }

    // @Get(':tag')
    // async getPartido(
    //     @Param('tag') tag: string
    // ): Promise<Response<any>> {
    //     const response = await this._partidosService.getPartidosImage(tag);
    //     return Response.create<any>(response);
    // }

    @Get()
    async getAll(
        @RealIP() ip: string,
        @Req() request: any
    ): Promise<Response<any>> {
        const response = await this._partidosService.getAll(request.headers['user-agent']);
        return Response.create<any>(response);
    }

    @Post('/:id/votar')
    async votar(
        @Req() request: any,
        @RealIP() ip: string,
        @Param('id', ParseIntPipe) id: number
    ): Promise<Response<any>> {
        const response = await this._partidosService.votar(
            id,
            request.headers['user-agent'],
            ip
        );
        return Response.create<any>(response);
    }
}