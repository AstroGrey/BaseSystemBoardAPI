"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.holdRepository = void 0;
const holdEntity_1 = require("./entities/holdEntity");
const typeorm_1 = require("typeorm");
const baseHoldEntity_1 = require("./entities/baseHoldEntity");
const baseHoldRepository_1 = require("./baseHoldRepository");
const problemsRepository_1 = require("./problemsRepository");
let holdRepository = class holdRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.baseHoldRepos = new baseHoldRepository_1.baseHoldRepository();
        this.problemRepos = new problemsRepository_1.problemRepository();
        this.holdRepos = typeorm_1.getConnection(process.env.RDS_DB_NAME).getRepository(holdEntity_1.HoldEntity);
    }
    //holdRepos = getConnection("WoodsTestDB").getRepository(HoldEntity); 
    async createHold(holdLocation, holdType, problemId) {
        let newHold = new holdEntity_1.HoldEntity();
        // Save Hold Problem Attributes
        newHold.problem = problemId;
        newHold.type = holdType;
        // Relate Hold to BaseHold 
        newHold.baseHold = new baseHoldEntity_1.BaseHoldEntity();
        newHold.baseHold = await this.baseHoldRepos.getBaseHoldByLocation(holdLocation);
        // save hold in db
        await this.holdRepos.save(newHold);
    }
    async translateToClientHoldEntity(hold) {
        const clientEntity = {
            type: hold.type,
            baseHoldLocation: hold.baseHold.location
        };
        return clientEntity;
    }
    async translateToClientHoldList(problem) {
        let clientHoldList;
        clientHoldList = Array(problem.holdCount);
        for (var i = 0; i < problem.holdCount; i++) {
            clientHoldList[i].type = problem.holdList[i].type;
            clientHoldList[i].baseHoldLocation = problem.holdList[i].baseHold.location;
        }
        return clientHoldList;
    }
    async patchHoldsByProblemID(problemId, updatedProblem) {
        let holdList = await this.getHoldsByProblemId(problemId, updatedProblem.holdCount);
        let updatedHoldList = Array(updatedProblem.holdCount);
        for (var i = 0; i < updatedProblem.holdCount; i++) {
            console.log(holdList[i].id);
            await this.holdRepos.update(holdList[i].id, { baseHold: await this.baseHoldRepos.getBaseHoldByLocation(updatedProblem.holdList[i].baseHoldLocation) });
            await this.holdRepos.update(holdList[i].id, { problem: problemId });
            await this.holdRepos.update(holdList[i].id, { type: updatedProblem.holdList[i].type });
            updatedHoldList[i] = this.translateToClientHoldEntity(holdList[i]);
        }
    }
    async getHoldsByProblemId(problemId, holdCount) {
        console.log("All holds for problem:", problemId, "With hold count:", holdCount);
        let problemHolds = Array(holdCount);
        problemHolds = await this.holdRepos.find({
            where: { problem: problemId }
        });
        if (problemHolds != []) {
            console.log("All holds for problem:", problemId, problemHolds);
            return problemHolds;
        }
        else {
            console.log("No holds for problem of problemId = ", problemId);
            return [];
        }
    }
    async deleteHoldsByProblemId(problemId, holdCount) {
        console.log("Delete holds for problem:", problemId);
        let holdsToRemove = await this.getHoldsByProblemId(problemId, holdCount);
        await this.holdRepos.remove(holdsToRemove);
    }
};
holdRepository = __decorate([
    typeorm_1.EntityRepository()
], holdRepository);
exports.holdRepository = holdRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9sZFJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kYXRhYmFzZS9ob2xkUmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQscUNBQW9FO0FBQ3BFLDhEQUEyRDtBQUMzRCw2REFBMEQ7QUFFMUQsNkRBQXlEO0FBS3pELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxvQkFBc0I7SUFBMUQ7O1FBQ0ksa0JBQWEsR0FBRyxJQUFJLHVDQUFrQixFQUFFLENBQUM7UUFDekMsaUJBQVksR0FBRyxJQUFJLHNDQUFpQixFQUFFLENBQUM7UUFDdkMsY0FBUyxHQUFHLHVCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsdUJBQVUsQ0FBQyxDQUFDO0lBOEVqRixDQUFDO0lBN0VHLHNFQUFzRTtJQUV0RSxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQW9CLEVBQUUsUUFBZ0IsRUFBRSxTQUFpQjtRQUN0RSxJQUFJLE9BQU8sR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUUvQiwrQkFBK0I7UUFDL0IsT0FBTyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDNUIsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFFeEIsMkJBQTJCO1FBQzNCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSwrQkFBYyxFQUFFLENBQUM7UUFDeEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFaEYsa0JBQWtCO1FBQ2xCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxJQUFnQjtRQUM5QyxNQUFNLFlBQVksR0FBcUI7WUFDbkMs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