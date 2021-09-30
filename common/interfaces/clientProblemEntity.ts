import { ClientHoldEntity } from "./clientHoldEntity";

export interface ClientProblemEntity{
    id: number;
    problemName: string;
    authorUsername: string;
    problemGrade: number;
    isBenchmark?: boolean;
    proposedGrade: number;
    matching?: boolean;
    holdList: ClientHoldEntity[];
    angle: number;
    datePublished?: string;
    holdCount: number;
}