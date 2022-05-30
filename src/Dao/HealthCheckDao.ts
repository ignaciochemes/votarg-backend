import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HealthCheckEntity } from "src/Models/Entities/HealthCheckEntity";
import { Repository } from "typeorm";

@Injectable()
export class HealthCheckDao {
    constructor(@InjectRepository(HealthCheckEntity) private readonly healthCheckRepository: Repository<HealthCheckEntity>) {}

    async findOne(id: number): Promise<HealthCheckEntity> {
        const query = this.healthCheckRepository
            .createQueryBuilder("healthCheck")
            .where("healthCheck.id = :id", { id: id })
            .getOne();
        return query;
    }
}