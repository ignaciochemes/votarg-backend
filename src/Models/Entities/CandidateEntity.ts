import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { Partidos } from "./PartidosEntity";

@Entity()
export class Candidate extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToOne(() => Partidos, partido => partido.id)
    @JoinColumn({ name: 'partido_id' })
    public partido: Partidos;

    @Column()
    public votos: number;

    @Column({ nullable: false, name: "foto_url" })
    public fotoUrl: string;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPartido(): Partidos {
        return this.partido;
    }

    public setPartido(partido: Partidos): void {
        this.partido = partido;
    }

    public getVotos(): number {
        return this.votos;
    }

    public setVotos(votos: number): void {
        this.votos = votos;
    }

    public getFotoUrl(): string {
        return this.fotoUrl;
    }

    public setFotoUrl(fotoUrl: string): void {
        this.fotoUrl = fotoUrl;
    }


}