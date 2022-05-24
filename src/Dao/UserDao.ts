import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Models/Entities/UserEntity";
import { Repository } from "typeorm";

@Injectable()
export class UserDao {
    constructor(@InjectRepository(User) private _userRepository: Repository<User>) { }

    async create(user: User): Promise<User> {
        return await this._userRepository.save(user);
    }

    async findByIp(ip: string): Promise<User[]> {
        const query = this._userRepository.createQueryBuilder("user")
            .where("user.ip = :ip", { ip: ip })
            .getMany();
        return await query;
    }

}