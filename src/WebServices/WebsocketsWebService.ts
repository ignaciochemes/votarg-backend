import { Injectable } from "@nestjs/common";
import { VoteSocketRequest } from "src/Models/Request/PartidosController/VoteSocketRequest";
import { AxiosWebServices } from "./AxiosWebService";

@Injectable()
export class WebSocketWebService extends AxiosWebServices {
    webSocketUri: string;

    constructor() {
        super();
        this.webSocketUri = process.env.WEBSOCKET_URI;
    }

    async vote(data: VoteSocketRequest): Promise<void> {
        const url = `${this.webSocketUri}/vote`;
        this.post(url, data);
    }

}