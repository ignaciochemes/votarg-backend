import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import Response from "src/Helpers/Formatter/Response";
import CreateCandidateRequest from "src/Models/Request/CandidatesController/CreateCandidateRequest";
import { CandidateService } from "src/Services/CandidatesService";

@Controller('candidates')
export class CandidatesController {
    constructor(private readonly _candidatesService: CandidateService) { }

    @Get('/:id')
    async get(
        @Param('id') id: number
    ): Promise<any> {
        const response = await this._candidatesService.getById(id);
        return Response.create<any>(response);
    }

    @Post()
    async post(
        @Body() candidate: CreateCandidateRequest
    ): Promise<Response<any>> {
        const response = await this._candidatesService.create(candidate);
        return Response.create<any>(response);
    }
}