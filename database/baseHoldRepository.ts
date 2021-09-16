import { EntityRepository, Repository, getRepository, getConnection} from "typeorm";
import { BaseHoldEntity } from './entities/baseHoldEntity';

@EntityRepository()
export class baseHoldRepository extends Repository<BaseHoldEntity> {
    baseHoldRepos= getConnection(process.env.RDS_DB_NAME).getRepository(BaseHoldEntity);
    //baseHoldRepos= getConnection().getRepository(BaseHoldEntity);

    async createBaseHold(baseHold: BaseHoldEntity){
        let newBaseHold = new BaseHoldEntity();
        newBaseHold.descriptor = baseHold.descriptor;
        newBaseHold.location = baseHold.location;
        await this.baseHoldRepos.save(newBaseHold);
        return newBaseHold;
    }

    async getBaseHoldByLocation(location: number): Promise <BaseHoldEntity>{
        let baseHold = await this.baseHoldRepos.findOne({ 
            where: {location : location }
            });
        if(baseHold){
            return baseHold;
        }
        else{
            return baseHold!;
        }
    }

    /*async getLocationById(baseHoldId: number): Promise <number>{
        let baseHold = await this.baseHoldRepos.find({
            where: {id : baseHoldId}
        })
        return baseHold.location;
    }

    async deleteAllHolds(){
        console.log("deleteAllProblems");
        let baseHoldRepos = getConnection(process.env.RDS_DB_NAME).getRepository(BaseHoldEntity);
        let problems = await this.getAllProblems();
        let holdRepos = new holdRepository();
        for(var i = 0; i < problems.length; i++){
            holdRepos.deleteHoldsByProblemId(problems[i].id, problems[i].holdCount);
        }
        await probRepos.remove(
            problems
        );
    }

    async removeById(id: any){
        console.log("Remove problem of id:", id);
        let probRepos = getConnection(process.env.RDS_DB_NAME).getRepository(ProblemEntity);
        let problemToRemove = await this.searchById(id);
        let holdRepos = new holdRepository();
        await holdRepos.deleteHoldsByProblemId(id, problemToRemove.holdCount);
        await probRepos.delete({
            id : id
        });
    }*/
}

export default new baseHoldRepository();