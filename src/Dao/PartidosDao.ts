import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Partidos } from "src/Models/Entities/PartidosEntity";
import { Repository } from "typeorm";

@Injectable()
export class PartidosDao {
    constructor(@InjectRepository(Partidos) private _partidoRepository: Repository<Partidos>) { }

    async findAll(): Promise<Partidos[]> {
        return await this._partidoRepository.find();
    }

    async findOne(id: number): Promise<Partidos> {
        return await this._partidoRepository.findOne(id);
    }

    async create(partido: Partidos): Promise<Partidos> {
        return await this._partidoRepository.save(partido);
    }

    async update(partido: Partidos): Promise<Partidos> {
        return await this._partidoRepository.save(partido);
    }

    async getCountOfAllVotes(): Promise<any> {
        const query = this._partidoRepository
            .createQueryBuilder('partido')
            .select('SUM(partido.votos)', 'totalVotos')
            .getQuery();
        return await this._partidoRepository.query(query);
    }
}