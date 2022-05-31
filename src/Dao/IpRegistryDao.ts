import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IpRegistryEntity } from "src/Models/Entities/IpRegistryEntity";
import { Repository } from "typeorm";

@Injectable()
export class IpRegistryDao {
    constructor(@InjectRepository(IpRegistryEntity) private readonly _IpRegistryRepository: Repository<IpRegistryEntity>) { }

    async save(ipRegistry: IpRegistryEntity): Promise<void> {
        await this._IpRegistryRepository.save(ipRegistry);
    }
}