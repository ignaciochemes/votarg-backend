import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SecretKey {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public key: string;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getKey(): string {
        return this.key;
    }

    public setKey(key: string): void {
        this.key = key;
    }

}