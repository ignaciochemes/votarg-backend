import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";

@Entity()
export class Partidos extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public logo: string;

    @Column()
    public votos: number;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getLogo(): string {
        return this.logo;
    }

    public setLogo(logo: string): void {
        this.logo = logo;
    }

    public getVotos(): number {
        return this.votos;
    }

    public setVotos(votos: number): void {
        this.votos = votos;
    }
}