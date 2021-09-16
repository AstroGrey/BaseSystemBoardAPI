import { HoldEntity } from './entities/holdEntity';
import {EntityRepository, Repository, getConnection} from "typeorm";
import { BaseHoldEntity } from './entities/baseHoldEntity';
import { baseHoldRepository } from './baseHoldRepository';
import { ProblemEntity } from './entities/problemEntity';
import { problemRepository } from './problemsRepository';
import { ClientHoldEntity } from '../common/interfaces/clientHoldEntity';
import { ClientProblemEntity } from '../common/interfaces/clientProblemEntity';

@EntityRepository()
export class holdRepository extends Repository<HoldEntity> {
    baseHoldRepos = new baseHoldRepository();
    problemRepos = new problemRepository();
    holdRepos = getConnection(process.env.RDS_DB_NAME).getRepository(HoldEntity); 
    //holdRepos = getConnection("WoodsTestDB").getRepository(HoldEntity); 

    async createHold(holdLocation: number, holdType: string, problemId: number){
        let newHold = new HoldEntity();

        // Save Hold Problem Attributes
        newHold.problem = problemId;
        newHold.type = holdType;

        // Relate Hold to BaseHold 
        newHold.baseHold = new BaseHoldEntity();
        newHold.baseHold = await this.baseHoldRepos.getBaseHoldByLocation(holdLocation);

        // save hold in db
        await this.holdRepos.save(newHold);
    }

    async translateToClientHoldEntity(hold: HoldEntity): Promise<ClientHoldEntity>{
        const clientEntity: ClientHoldEntity = {
            type: hold.type,
            baseHoldLocation: hold.baseHold.location
        };
        return clientEntity;
    }

    async translateToClientHoldList(problem: ProblemEntity): Promise<ClientHoldEntity[]>{
        let clientHoldList : ClientHoldEntity[];
        clientHoldList = Array(problem.holdCount);
        for(var i = 0; i < problem.holdCount; i++){
            clientHoldList[i].type = problem.holdList[i].type;
            clientHoldList[i].baseHoldLocation = problem.holdList[i].baseHold.location;
        }
        return clientHoldList;
    }

    async patchHoldsByProblemID(problemId: any, updatedProblem: ClientProblemEntity){
        let holdList = await this.getHoldsByProblemId(problemId, updatedProblem.holdCount);
        let updatedHoldList = Array(updatedProblem.holdCount);
        for(var i = 0; i < updatedProblem.holdCount; i++){ 
            console.log(holdList[i].id);
            
            await this.holdRepos.update(holdList[i].id, 
                { baseHold: await this.baseHoldRepos.getBaseHoldByLocation(updatedProblem.holdList[i].baseHoldLocation) }
            )
            await this.holdRepos.update(holdList[i].id, 
                { problem: problemId }
            )
            await this.holdRepos.update(holdList[i].id, 
                { type: updatedProblem.holdList[i].type }
            )
            updatedHoldList[i] = this.translateToClientHoldEntity(holdList[i]);
        }
    }

    async getHoldsByProblemId(problemId: any, holdCount: number): Promise<HoldEntity[]>{
        console.log("All holds for problem:", problemId, "With hold count:", holdCount);
        let problemHolds = Array(holdCount);
        problemHolds = await this.holdRepos.find({
            where: { problem : problemId }
        });
        if(problemHolds != []){
            console.log("All holds for problem:", problemId, problemHolds);
            return problemHolds;
        }
        else{
            console.log("No holds for problem of problemId = ", problemId);
            return []; 
        }
    }

    async deleteHoldsByProblemId(problemId: any, holdCount: any){
        console.log("Delete holds for problem:", problemId);
        let holdsToRemove = await this.getHoldsByProblemId(problemId, holdCount);
        await this.holdRepos.remove(
            holdsToRemove
        );
    }
}

