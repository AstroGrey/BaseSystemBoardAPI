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
        this.holdRepos = (0, typeorm_1.getConnection)(process.env.RDS_DB_NAME).getRepository(holdEntity_1.HoldEntity);
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
    (0, typeorm_1.EntityRepository)()
], holdRepository);
exports.holdRepository = holdRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9sZFJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kYXRhYmFzZS9ob2xkUmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQscUNBQW9FO0FBQ3BFLDhEQUEyRDtBQUMzRCw2REFBMEQ7QUFFMUQsNkRBQXlEO0FBS3pELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxvQkFBc0I7SUFBMUQ7O1FBQ0ksa0JBQWEsR0FBRyxJQUFJLHVDQUFrQixFQUFFLENBQUM7UUFDekMsaUJBQVksR0FBRyxJQUFJLHNDQUFpQixFQUFFLENBQUM7UUFDdkMsY0FBUyxHQUFHLElBQUEsdUJBQWEsRUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyx1QkFBVSxDQUFDLENBQUM7SUE4RWpGLENBQUM7SUE3RUcsc0VBQXNFO0lBRXRFLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBb0IsRUFBRSxRQUFnQixFQUFFLFNBQWlCO1FBQ3RFLElBQUksT0FBTyxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBRS9CLCtCQUErQjtRQUMvQixPQUFPLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUM1QixPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUV4QiwyQkFBMkI7UUFDM0IsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztRQUN4QyxPQUFPLENBQUMsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoRixrQkFBa0I7UUFDbEIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsS0FBSyxDQUFDLDJCQUEyQixDQUFDLElBQWdCO1FBQzlDLE1BQU0sWUFBWSxHQUFxQjtZ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