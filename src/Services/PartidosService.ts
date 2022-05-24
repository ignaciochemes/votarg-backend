import { BadRequestException, Injectable } from "@nestjs/common";
import { PartidosDao } from "src/Dao/PartidosDao";
import { SecretKeyDao } from "src/Dao/SecretKeyDao";
import { UserDao } from "src/Dao/UserDao";
import { Partidos } from "src/Models/Entities/PartidosEntity";
import { User } from "src/Models/Entities/UserEntity";
import { BufferedFile } from "src/Models/File/FileModel";
import CreatePartidoRequest from "src/Models/Request/PartidosController/CreatePartidoRequest";
import SuccessfullResponse from "src/Models/Response/SuccessfullResponse";
import { MinioService } from "./MinioService/MinioService";

const DeviceDetector = require('node-device-detector');

@Injectable()
export class PartidosService {
    constructor(
        private readonly _partidosDao: PartidosDao,
        private readonly _secretKeyDao: SecretKeyDao,
        private readonly _userDao: UserDao,
        private readonly _minioService: MinioService
    ) { }

    async create(partido: CreatePartidoRequest, image: BufferedFile): Promise<SuccessfullResponse> {
        const findSecretKey = await this._secretKeyDao.findOne(partido.secretKey);
        if (!findSecretKey) throw new BadRequestException('Secret key not found');
        const minioImageUrl = await this._minioService.upload(image, 'votarg');
        let newPartido = new Partidos();
        newPartido.setName(partido.name);
        newPartido.setLogo(minioImageUrl.url);
        newPartido.setVotos(0);
        await this._partidosDao.create(newPartido);
        return new SuccessfullResponse(true);
    }

    // async getPartidosImage(tag: string): Promise<any> {
    //     return await this._minioService.getFile('votarg', tag);
    // }

    async getAll(userAgent: any): Promise<Partidos[]> {
        const detector = new DeviceDetector();
        const result = detector.detect(userAgent);
        console.log(result);
        return await this._partidosDao.findAll();
    }

    async votar(id: number, userAgent: any, ip: string): Promise<SuccessfullResponse> {
        const detector = new DeviceDetector();
        const result = detector.detect(userAgent);
        let findPartido = await this._partidosDao.findOne(id);
        if (!findPartido) throw new BadRequestException('Partido not found');
        const findUser = await this._userDao.findByIp(ip);
        if (findUser.length > 0) {
            const findUserBrowser = findUser.find(user => user.getBrowserName() === result.client.name);
            const findUserOs = findUser.find(user => user.getOsName() === result.os.name);
            const findUserType = findUser.find(user => user.getDeviceType() === result.device.type);
            if (
                findUserBrowser && findUserOs && findUserType ||
                findUserBrowser && findUserType ||
                findUserOs && findUserType ||
                findUserBrowser
            ) {
                throw new BadRequestException('User already voted');
            };
        }
        let newUser = new User();
        newUser.setIp(ip);
        newUser.setUserAgent(userAgent);
        newUser.setOsName(result.os.name);
        newUser.setOsPlatform(result.os.platform);
        newUser.setBrowserName(result.client.name);
        newUser.setDeviceType(result.device.type);
        newUser.setDeviceBrand(result.device.brand);
        newUser.setDeviceModel(result.device.model);
        await this._userDao.create(newUser);
        findPartido.setVotos(findPartido.getVotos() + 1);
        await this._partidosDao.update(findPartido);
        return new SuccessfullResponse(true);
    }

    async getCountOfAllVotes(): Promise<any> {
        const count = await this._partidosDao.getCountOfAllVotes();
        return count[0];
    }
}