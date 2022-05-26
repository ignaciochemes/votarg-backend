import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import Response from "src/Helpers/Formatter/Response";
import { HttpInterceptor } from "src/Middleware/HttpInterceptor";
import { Partidos } from "src/Models/Entities/PartidosEntity";
import { BufferedFile } from "src/Models/File/FileModel";
import CreatePartidoRequest from "src/Models/Request/PartidosController/CreatePartidoRequest";
import VotePartidoRequest from "src/Models/Request/PartidosController/VotePartidoRequest";
import SuccessfullResponse from "src/Models/Response/SuccessfullResponse";
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

    @Get()
    async getAll(
    ): Promise<Response<Partidos[]>> {
        const response = await this._partidosService.getAll();
        return Response.create<Partidos[]>(response);
    }

    @UseInterceptors(HttpInterceptor)
    @Post('/:id/votar')
    async votar(
        @Req() request: any,
        @Body() data: VotePartidoRequest,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Response<SuccessfullResponse>> {
        const response = await this._partidosService.votar(id, request, data);
        return Response.create<SuccessfullResponse>(response);
    }
}