import { Controller, Get } from "@nestjs/common";
import Response from "src/Helpers/Formatter/Response";

@Controller('health-check')
export class HealtCheckController {
    constructor() {} 

    @Get()
    async healtCheck(): Promise<Response<object>> {
        return Response.create<object>({});
    }
}