import { ProblemEntity } from './entities/problemEntity';
import { HoldEntity } from './entities/holdEntity';
import { EntityRepository, Repository, getConnection } from "typeorm";
import { holdRepository } from './holdRepository';
import { UserEntity } from './entities/userEntity';
import { UserRepository } from './userRepository';
import { baseHoldRepository } from './baseHoldRepository';
import { BaseHoldEntity } from './entities/baseHoldEntity';
import { ClientProblemEntity } from '../common/interfaces/clientProblemEntity';
import date from 'date-and-time';
import { ClientUserEntity } from '../common/interfaces/clientUserEntiy';

@EntityRepository()
export class problemRepository extends Repository<ProblemEntity> {
    problemRepos = getConnection(process.env.RDS_DB_NAME).getRepository(ProblemEntity);
    //problemRepos = getConnection("WoodsTestDB").manager.getRepository(ProblemEntity);
    userRepos = new UserRepository();
    holdRepos = new holdRepository();
    baseHoldRepos = new baseHoldRepository();

    async createProblem(problem: ClientProblemEntity): Promise <ProblemEntity>{
        console.log("Create Problem");
        
        // Save Problem Attributes
        let newProblem = new ProblemEntity();
        newProblem.problemGrade = problem.problemGrade;
        newProblem.problemName = problem.problemName;
        newProblem.angle = problem.angle;
        newProblem.isBenchmark = problem.isBenchmark;
        newProblem.holdCount = problem.holdList.length;
        newProblem.matching = problem.matching;

        // Save Date Published
        let now = new Date();
        newProblem.datePublished = date.format(now, 'MM/DD/YYYY HH:mm:ss');

        // Assign User to problem relationship
        let author = new UserEntity();
        console.log("Problem author is", problem.authorUsername);
        author = await this.userRepos.searchByUsername(problem.authorUsername);
        await this.userRepos.addProblemToPublishedProblems(problem, author);
        newProblem.authorId = author.id;

        // Save Holds in Problem
        newProblem.holdList = new Array(problem.holdList.length);
        for(var i = 0; i < problem.holdList.length; i++){ 
            // Create new instance of Hold Entity
            newProblem.holdList[i] = new HoldEntity(); 
            newProblem.holdList[i].type = problem.holdList[i].type;

            // Save corresponding base hold to problem hold entity
            let tempBaseHold = new BaseHoldEntity();
            tempBaseHold = await this.baseHoldRepos.getBaseHoldByLocation(problem.holdList[i].baseHoldLocation); 
            newProblem.holdList[i].baseHold = tempBaseHold;
            this.holdRepos.createHold(newProblem.holdList[i].baseHold.location, newProblem.holdList[i].type, newProblem.id);
         }

         // Save Problem and return
        let savedProblem = await this.problemRepos.save(newProblem);
        return savedProblem;
    }

    async getAllProblems(): Promise <ClientProblemEntity[]> {
        // Returns all climbs in savedProblems, total of climbs in totalProblems
        let [savedProblems, totalProblems] = await this.problemRepos.findAndCount();
        if(savedProblems != []){
            let savedProblemsFinal: ClientProblemEntity[];
            savedProblemsFinal = Array(totalProblems);
            for(var i =0; i < totalProblems; i++){
                savedProblemsFinal[i] = await this.translateToClientEntity(await this.searchById(savedProblems[i].id));
            }
            console.log("All problems from the db: ", savedProblems);
            return savedProblemsFinal;
        }
        else{
            console.log("No problems found");
            return []; 
        }
    }

    async getProblemsByAngle(angle: number): Promise <ClientProblemEntity[]> {
        let probRepos = getConnection(process.env.RDS_DB_NAME).getRepository(ProblemEntity);
        let [savedProblemsAtAngle, totalProblemsAtAngle] = await probRepos.findAndCount({
            where: {angle : angle}
        });
        if(savedProblemsAtAngle != []){
            let savedProblemsAtAngleFinal: ClientProblemEntity[];
            savedProblemsAtAngleFinal = Array(totalProblemsAtAngle);
            for(var i =0; i < totalProblemsAtAngle; i++){
                savedProblemsAtAngleFinal[i] = await this.translateToClientEntity(await this.searchById(savedProblemsAtAngle[i].id));
            }
            console.log("All problems from the db at angle: ", angle);
            console.log(savedProblemsAtAngle);
            return savedProblemsAtAngleFinal;
        }
        else{
            console.log("No problems at angle: ", angle, " found");
            return []; 
        }
    }

    async convertClimbsAroundAngle(angle: any): Promise <ClientProblemEntity[]>{
        var actualAngle: number = +angle;
        let climbs10AboveAngle = await this.getProblemsByAngle(actualAngle-10);
        let climbs5AboveAngle = await this.getProblemsByAngle(actualAngle-5);
        let climbsAtAngle = await this.getProblemsByAngle(actualAngle);
        let climbs5BelowAngle = await this.getProblemsByAngle(actualAngle+5);
        let climbs10BelowAngle = await this.getProblemsByAngle(actualAngle+10);
        var totalClimbs = (climbs10AboveAngle.length 
                        + climbs5AboveAngle.length 
                        + climbsAtAngle.length
                        + climbs5BelowAngle.length
                        + climbs10BelowAngle.length);
        let allClimbs = Array <ClientProblemEntity>(totalClimbs);
        var index = 0;
        for(var i = 0; i < climbs10AboveAngle.length; i++){
            allClimbs[index] = climbs10AboveAngle[i];
            allClimbs[index].proposedGrade = climbs10AboveAngle[i].problemGrade+2;
            index++;
        }
        for(var i = 0; i < climbs5AboveAngle.length; i++){
            allClimbs[index] = climbs5AboveAngle[i];
            allClimbs[index].proposedGrade = climbs5AboveAngle[i].problemGrade+1;
            index++;
        }
        for(var i = 0; i < climbsAtAngle.length; i++){
            allClimbs[index] = climbsAtAngle[i];
            allClimbs[index].proposedGrade = climbsAtAngle[i].problemGrade;
            index++;
        }
        for(var i = 0; i < climbs5BelowAngle.length; i++){
            allClimbs[index] = climbs5BelowAngle[i];
            if(climbs5BelowAngle[i].problemGrade-1 < 0){
                allClimbs[index].proposedGrade = 0;
            }
            else{
                allClimbs[index].proposedGrade = climbs5BelowAngle[i].problemGrade-1;
            }
            index++;
        }
        for(var i = 0; i < climbs10BelowAngle.length; i++){
            allClimbs[index] = climbs10BelowAngle[i];
            if(climbs10BelowAngle[i].problemGrade-2 < 0){
                allClimbs[index].proposedGrade = 0;
            }
            else{
                allClimbs[index].proposedGrade = climbs10BelowAngle[i].problemGrade-2;
            }
            index++;
        }
        return allClimbs;
    }

    async getProblemsByGradeAndAngle(angle: any, grade: any): Promise <ClientProblemEntity[]>{
        var actualGrade: number = +grade;

        let climbsByAngle = await this.convertClimbsAroundAngle(angle);
        let climbsByBoth = new Array();
        for(var i = 0; i < climbsByAngle.length; i++){
            if(climbsByAngle[i].proposedGrade == actualGrade || climbsByAngle[i].problemGrade == actualGrade){
                climbsByBoth.push(climbsByAngle[i]);
            }
        }

        return climbsByBoth;
    }

    async getProblemHoldList(problemID: any, holdCount: number): Promise <HoldEntity[]>{
        console.log("probRepos getProblemHoldList of problem: ", problemID);
        let problemHoldList = await this.holdRepos.getHoldsByProblemId(problemID, holdCount);
        return problemHoldList;
    }
   
    async searchById(id: any): Promise <ProblemEntity>{
        console.log("probRepos searchById");
        console.log(id);
        let problem = await this.problemRepos.findOne({
            where: {id : id}
        });
        if(problem){
            console.log("Found problem");
            let problemHoldList = await this.getProblemHoldList(id, problem.holdCount);
            problem.holdList = Array(problem.holdCount);
            for(var i = 0; i < problem.holdCount; i++){
                problem.holdList[i] = new HoldEntity();
                problem.holdList[i].type = problemHoldList[i].type;
                problem.holdList[i].baseHold.location = problemHoldList[i].baseHold.location;
            }
            console.log("Returning Problem");
            //finalProblem = await this.translateToClientEntity(problem);
            return problem;
        }
        else{
            console.log("No problem");
            return problem!;
       }
    }

    async searchByUsername(username: string): Promise <ClientProblemEntity>{
        let problem = await this.problemRepos.findOne({
            where: {username : username}
        });
        let finalProblem: ClientProblemEntity;
        if(problem){
            finalProblem = await this.translateToClientEntity(problem);
            return finalProblem;
        }
        else{
            return finalProblem!;
       }
    }

    async searchByName(problemName: string): Promise <ClientProblemEntity>{
        console.log("probRepos searchByName");
        console.log(problemName);
        let finalProblem: ClientProblemEntity;
        let problem = await this.problemRepos.findOne({
            where: {problemName : problemName}
        });
        if(problem){
            console.log("Found problem");
            finalProblem = await this.translateToClientEntity(problem);
            return finalProblem;
        }
        else{
            console.log("No problem");
            return finalProblem!;
       }
    }

    async deleteAllProblems(){
        console.log("deleteAllProblems");
        let [savedProblems, totalProblems] = await this.problemRepos.findAndCount();
        for(var i = 0; i < totalProblems; i++){
            this.holdRepos.deleteHoldsByProblemId(savedProblems[i].id, savedProblems[i].holdCount);
        }
        await this.problemRepos.remove(
            savedProblems
        );
    }

    async removeById(id: any){
        console.log("Remove problem of id:", id);
        let problemToRemove = await this.searchById(id);
        await this.holdRepos.deleteHoldsByProblemId(id, problemToRemove.holdCount);
        await this.problemRepos.delete({
            id : id
        });
    }

    async translateToClientEntity(problem: ProblemEntity): Promise <ClientProblemEntity>{    
        let author = new UserEntity();
        author = await this.userRepos.searchById(problem.authorId);
        const clientEntity: ClientProblemEntity = {
            id: problem.id,
            problemName: problem.problemName,
            problemGrade: problem.problemGrade,
            proposedGrade: problem.problemGrade,
            authorUsername: author.username,
            isBenchmark: problem.isBenchmark,
            matching: problem.matching,
            angle: problem.angle,
            holdList: await this.holdRepos.translateToClientHoldList(problem),
            datePublished: problem.datePublished,
            holdCount: problem.holdCount
        };
        return clientEntity;
    }

    // REWRITE NOW THAT WE USE CLIENT ENTITY AND CAN CHECK VALUES OF EACH ATTRIBUTE
    async patchProblemById(id: any, problemInfo: Readonly<ClientProblemEntity>): Promise <ClientProblemEntity>{
        console.log("Patch problem:", problemInfo);
        let oldProblem = await this.searchById(id);

        // Patch Problem Attributes
        if(oldProblem.isBenchmark != problemInfo.isBenchmark)
            await this.problemRepos.update( id, { isBenchmark: problemInfo.isBenchmark });
        if(oldProblem.matching != problemInfo.matching)
            await this.problemRepos.update( id, { matching: problemInfo.matching });
        if(oldProblem.problemName != problemInfo.problemName)
            await this.problemRepos.update( id, { problemName: problemInfo.problemName });
        if(oldProblem.problemGrade != problemInfo.problemGrade)
            await this.problemRepos.update( id, { problemGrade: problemInfo.problemGrade });
        if(oldProblem.angle != problemInfo.angle)    
            await this.problemRepos.update( id, { angle: problemInfo.angle });
        //if(oldProblem.author.username != problemInfo.authorUsername) 
        //    await this.problemRepos.update( id, { author: await this.userRepos.searchByUsername(problemInfo.authorUsername) });

        // Patch BaseHold Entities
        this.holdRepos.patchHoldsByProblemID(id, problemInfo);

        let updatedProblem = await this.searchById(id);
        return await this.translateToClientEntity(updatedProblem);
    }
}