import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";

@Entity()
export class User extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Index({ unique: false })
    @Column()
    public ip: string;

    @Column()
    public userAgent: string;

    @Column()
    public osName: string;

    @Column()
    public osPlatform: string;

    @Column()
    public browserName: string;

    @Column()
    public deviceType: string;

    @Column()
    public deviceBrand: string;

    @Column()
    public deviceModel: string;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getIp(): string {
        return this.ip;
    }

    public setIp(ip: string): void {
        this.ip = ip;
    }

    public getUserAgent(): string {
        return this.userAgent;
    }

    public setUserAgent(userAgent: string): void {
        this.userAgent = userAgent;
    }

    public getOsName(): string {
        return this.osName;
    }

    public setOsName(osName: string): void {
        this.osName = osName;
    }

    public getOsPlatform(): string {
        return this.osPlatform;
    }

    public setOsPlatform(osPlatform: string): void {
        this.osPlatform = osPlatform;
    }

    public getBrowserName(): string {
        return this.browserName;
    }

    public setBrowserName(browserName: string): void {
        this.browserName = browserName;
    }

    public getDeviceType(): string {
        return this.deviceType;
    }

    public setDeviceType(deviceType: string): void {
        this.deviceType = deviceType;
    }

    public getDeviceBrand(): string {
        return this.deviceBrand;
    }

    public setDeviceBrand(deviceBrand: string): void {
        this.deviceBrand = deviceBrand;
    }

    public getDeviceModel(): string {
        return this.deviceModel;
    }

    public setDeviceModel(deviceModel: string): void {
        this.deviceModel = deviceModel;
    }


}