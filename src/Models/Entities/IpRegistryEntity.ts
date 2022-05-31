import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";

@Entity()
export class IpRegistryEntity extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public ip: string;

    @Column({ nullable: true })
    public state: string;

    @Column({ nullable: true })
    public city: string;

    @Column({ name: "postal_code", nullable: true })
    public postalCode: string;

    @Column({ nullable: false })
    public vote: string;

    public getIp(): string {
        return this.ip;
    }

    public setIp(ip: string): void {
        this.ip = ip;
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getPostalCode(): string {
        return this.postalCode;
    }

    public setPostalCode(postalCode: string): void {
        this.postalCode = postalCode;
    }

    public getVote(): string {
        return this.vote;
    }

    public setVote(vote: string): void {
        this.vote = vote;
    }

}