import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import * as geoip from 'geoip-lite';

export interface Response<T> {
    response: T;
}

@Injectable()
export class HttpInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        const geoLocationIp = geoip.lookup(ip);
        if (geoLocationIp?.country !== 'US') throw new BadRequestException('No intente vulnerar la seguridad de nuestra plataforma');
        return next.handle();
    }
}