import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { HoldEntity } from "./holdEntity";
import { UserEntity } from "./userEntity";

@Entity("ProblemEntity")
export class ProblemEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    problemName!: string;

    @ManyToOne(() => UserEntity, user => user.publishedProblems)
    authorId!: number;
    
    @Column()
    problemGrade!: number;

    @Column()
    holdCount!: number;

    @Column({default: false})
    isBenchmark?: boolean;

    @OneToMany(() => HoldEntity, hold => hold.problem)
    holdList!: HoldEntity[];

    @Column()
    angle!: number;

    // If true, matching is allowed. If false, no matching
    @Column({default: true})
    matching?: boolean; 

    @Column()
    datePublished!: string;
}