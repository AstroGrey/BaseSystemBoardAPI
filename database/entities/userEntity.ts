import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { ProblemEntity } from "./problemEntity";

@Entity("UserEntity")
export class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => ProblemEntity, problem => problem.author)
    publishedProblems?: ProblemEntity[];

    @Column()
    loggedProblemIds?: number[];
}