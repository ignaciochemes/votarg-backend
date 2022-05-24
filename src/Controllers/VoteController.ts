import { Controller, Get } from "@nestjs/common";
import Response from "src/Helpers/Formatter/Response";
import CountTotalVotesResponse from "src/Models/Response/CountTotalVotesResponse";
import { VoteService } from "src/Services/VoteService";

@Controller('votes')
export class VoteController {
    constructor(private readonly _viteService: VoteService) { }

    @Get()
    async getAllVotes(): Promise<Response<CountTotalVotesResponse>> {
        const response = await this._viteService.getAllVotes();
        return Response.create<CountTotalVotesResponse>(response);
    }
}