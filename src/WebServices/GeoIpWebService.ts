import { Injectable } from "@nestjs/common";
import { AxiosWebServices } from "./AxiosWebService";

@Injectable()
export class GeoIpWebService extends AxiosWebServices {
    
    async getGeoIp(ip: string): Promise<any> {
        const url = `${process.env.GEOIP_URI}`;
        const headers = this.buildDefaultConfig();
        const config = this.buildAxiosRequestConfig({ ...headers })
        const response = await this.post(url, { params: { ip } }, config);
        return response;
    }
}