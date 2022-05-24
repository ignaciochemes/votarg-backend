import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Candidate } from "src/Models/Entities/CandidateEntity";

@Injectable()
export class CandidatesDao {
    constructor(@InjectRepository(Candidate) private _candidateRepository: Repository<Candidate>) { }

    async findAll(): Promise<Candidate[]> {
        return await this._candidateRepository.find();
    }

    async findOneById(id: number): Promise<Candidate> {
        const query = this._candidateRepository
            .createQueryBuilder("candidate")
            .where("candidate.id = :id", { id: id })
            .getOne();
        return await query;
    }

    async findOne(id: number): Promise<Candidate> {
        return await this._candidateRepository.findOne(id);
    }

    async create(candidate: Candidate): Promise<Candidate> {
        return await this._candidateRepository.save(candidate);
    }
}