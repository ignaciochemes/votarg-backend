import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HealthCheckEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public checker: boolean;

    public getChecker(): boolean {
        return this.checker;
    }

    public setChecker(checker: boolean): void {
        this.checker = checker;
    }
}