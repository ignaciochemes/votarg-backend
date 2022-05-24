import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SecretKey } from "src/Models/Entities/SecretKeyEntity";

@Injectable()
export class SecretKeyDao {
    constructor(@InjectRepository(SecretKey) private _secretKeyRepository: Repository<SecretKey>) { }

    async findOne(key: string): Promise<SecretKey> {
        return await this._secretKeyRepository.findOne({ key: key });
    }

}