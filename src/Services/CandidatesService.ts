import { BadRequestException, Injectable } from "@nestjs/common";
import { CandidatesDao } from "src/Dao/CandidatesDao";
import { PartidosDao } from "src/Dao/PartidosDao";
import { SecretKeyDao } from "src/Dao/SecretKeyDao";
import { Candidate } from "src/Models/Entities/CandidateEntity";
import { Partidos } from "src/Models/Entities/PartidosEntity";
import { SecretKey } from "src/Models/Entities/SecretKeyEntity";
import CreateCandidateRequest from "src/Models/Request/CandidatesController/CreateCandidateRequest";
import SuccessfullResponse from "src/Models/Response/SuccessfullResponse";

@Injectable()
export class CandidateService {
    constructor(
        private readonly _partidosDao: PartidosDao,
        private readonly _candidatesDao: CandidatesDao,
        private readonly _secretKeyDao: SecretKeyDao
    ) { }

    async getById(id: number): Promise<Candidate> {
        const candidate = await this._candidatesDao.findOneById(id);
        if (!candidate) {
            throw new BadRequestException(`Candidate with id ${id} not found`);
        }
        return candidate;
    }

    async create(candidate: CreateCandidateRequest): Promise<SuccessfullResponse> {
        let findPartido: Partidos = await this._partidosDao.findOne(candidate.partido);
        if (!findPartido) throw new BadRequestException("Partido no encontrado");
        let findSecretKey: SecretKey = await this._secretKeyDao.findOne(candidate.secretKey);
        if (!findSecretKey) throw new BadRequestException("Clave secreta no encontrada");
        let newCandidate = new Candidate();
        newCandidate.setName(candidate.name);
        newCandidate.setPartido(findPartido);
        newCandidate.setVotos(0);
        newCandidate.setFotoUrl(candidate.fotoUrl);
        await this._candidatesDao.create(newCandidate);
        return new SuccessfullResponse(true);
    }
}