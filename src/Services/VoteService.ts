import { Injectable } from "@nestjs/common";
import CountTotalVotesResponse from "src/Models/Response/CountTotalVotesResponse";
import { PartidosService } from "./PartidosService";

@Injectable()
export class VoteService {
    constructor(private readonly _partidosService: PartidosService) { }

    async getAllVotes(): Promise<CountTotalVotesResponse> {
        const votes = await this._partidosService.getCountOfAllVotes();
        return new CountTotalVotesResponse(votes.totalVotos);
    }
}