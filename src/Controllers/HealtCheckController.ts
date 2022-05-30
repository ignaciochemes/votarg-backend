import { Controller, Get } from "@nestjs/common";
import Response from "src/Helpers/Formatter/Response";
import { HealthCheckService } from "src/Services/HealthCheckService";

@Controller('health-check')
export class HealtCheckController {
    constructor(private readonly _healthCheckService: HealthCheckService) {} 

    @Get()
    async healtCheck(): Promise<Response<object>> {
        return Response.create<object>({});
    }

    @Get('db')
    async healtCheckDB(): Promise<Response<boolean>> {
        const response = await this._healthCheckService.healtCheckDb();
        return Response.create<boolean>(response);
    }
}