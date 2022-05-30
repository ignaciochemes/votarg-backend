import { BadRequestException, Injectable } from "@nestjs/common";
import { HealthCheckDao } from "src/Dao/HealthCheckDao";

@Injectable()
export class HealthCheckService {
    constructor(private readonly _healthCheckDao: HealthCheckDao) { }

    async healtCheckDb(): Promise<boolean> {
        let id = 1;
        const healthCheck = await this._healthCheckDao.findOne(id);
        if (healthCheck?.getChecker() === undefined || healthCheck?.getChecker() === null) {
            throw new BadRequestException('DB is not working');
        }
        return healthCheck.getChecker();
    }
}