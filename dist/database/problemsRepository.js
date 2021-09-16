"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemRepository = void 0;
const problemEntity_1 = require("./entities/problemEntity");
const holdEntity_1 = require("./entities/holdEntity");
const typeorm_1 = require("typeorm");
const holdRepository_1 = require("./holdRepository");
const userEntity_1 = require("./entities/userEntity");
const userRepository_1 = require("./userRepository");
const baseHoldRepository_1 = require("./baseHoldRepository");
const baseHoldEntity_1 = require("./entities/baseHoldEntity");
const date_and_time_1 = __importDefault(require("date-and-time"));
let problemRepository = class problemRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.problemRepos = (0, typeorm_1.getConnection)(process.env.RDS_DB_NAME).getRepository(problemEntity_1.ProblemEntity);
        //problemRepos = getConnection("WoodsTestDB").manager.getRepository(ProblemEntity);
        this.userRepos = new userRepository_1.UserRepository();
        this.holdRepos = new holdRepository_1.holdRepository();
        this.baseHoldRepos = new baseHoldRepository_1.baseHoldRepository();
    }
    async createProblem(problem) {
        console.log("Create Problem");
        // Save Problem Attributes
        let newProblem = new problemEntity_1.ProblemEntity();
        newProblem.problemGrade = problem.problemGrade;
        newProblem.problemName = problem.problemName;
        newProblem.angle = problem.angle;
        newProblem.isBenchmark = problem.isBenchmark;
        newProblem.holdCount = problem.holdList.length;
        newProblem.matching = problem.matching;
        // Save Date Published
        let now = new Date();
        newProblem.datePublished = date_and_time_1.default.format(now, 'MM/DD/YYYY HH:mm:ss');
        // Assign User to problem relationship
        newProblem.author = new userEntity_1.UserEntity();
        console.log("Problem author is", problem.authorUsername);
        newProblem.author = await this.userRepos.searchByUsername(problem.authorUsername);
        // Save Holds in Problem
        newProblem.holdList = new Array(problem.holdList.length);
        for (var i = 0; i < problem.holdList.length; i++) {
            // Create new instance of Hold Entity
            newProblem.holdList[i] = new holdEntity_1.HoldEntity();
            newProblem.holdList[i].type = problem.holdList[i].type;
            // Save corresponding base hold to problem hold entity
            let tempBaseHold = new baseHoldEntity_1.BaseHoldEntity();
            tempBaseHold = await this.baseHoldRepos.getBaseHoldByLocation(problem.holdList[i].baseHoldLocation);
            newProblem.holdList[i].baseHold = tempBaseHold;
            this.holdRepos.createHold(newProblem.holdList[i].baseHold.location, newProblem.holdList[i].type, newProblem.id);
        }
        // Save Problem and return
        let savedProblem = await this.problemRepos.save(newProblem);
        return savedProblem;
    }
    async getAllProblems() {
        // Returns all climbs in savedProblems, total of climbs in totalProblems
        let [savedProblems, totalProblems] = await this.problemRepos.findAndCount();
        if (savedProblems != []) {
            let savedProblemsFinal;
            savedProblemsFinal = Array(totalProblems);
            for (var i = 0; i < totalProblems; i++) {
                savedProblemsFinal[i] = await this.translateToClientEntity(await this.searchById(savedProblems[i].id));
            }
            console.log("All problems from the db: ", savedProblems);
            return savedProblemsFinal;
        }
        else {
            console.log("No problems found");
            return [];
        }
    }
    async getProblemHoldList(problemID, holdCount) {
        console.log("probRepos getProblemHoldList of problem: ", problemID);
        let problemHoldList = await this.holdRepos.getHoldsByProblemId(problemID, holdCount);
        return problemHoldList;
    }
    async searchById(id) {
        console.log("probRepos searchById");
        console.log(id);
        let problem = await this.problemRepos.findOne({
            where: { id: id }
        });
        if (problem) {
            console.log("Found problem");
            let problemHoldList = await this.getProblemHoldList(id, problem.holdCount);
            problem.holdList = Array(problem.holdCount);
            for (var i = 0; i < problem.holdCount; i++) {
                problem.holdList[i] = new holdEntity_1.HoldEntity();
                problem.holdList[i].type = problemHoldList[i].type;
                problem.holdList[i].baseHold.location = problemHoldList[i].baseHold.location;
            }
            console.log("Returning Problem");
            //finalProblem = await this.translateToClientEntity(problem);
            return problem;
        }
        else {
            console.log("No problem");
            return problem;
        }
    }
    async searchByUsername(username) {
        let problem = await this.problemRepos.findOne({
            where: { username: username }
        });
        let finalProblem;
        if (problem) {
            finalProblem = await this.translateToClientEntity(problem);
            return finalProblem;
        }
        else {
            return finalProblem;
        }
    }
    async searchByName(problemName) {
        console.log("probRepos searchByName");
        console.log(problemName);
        let finalProblem;
        let problem = await this.problemRepos.findOne({
            where: { problemName: problemName }
        });
        if (problem) {
            console.log("Found problem");
            finalProblem = await this.translateToClientEntity(problem);
            return finalProblem;
        }
        else {
            console.log("No problem");
            return finalProblem;
        }
    }
    async deleteAllProblems() {
        console.log("deleteAllProblems");
        let [savedProblems, totalProblems] = await this.problemRepos.findAndCount();
        for (var i = 0; i < totalProblems; i++) {
            this.holdRepos.deleteHoldsByProblemId(savedProblems[i].id, savedProblems[i].holdCount);
        }
        await this.problemRepos.remove(savedProblems);
    }
    async removeById(id) {
        console.log("Remove problem of id:", id);
        let problemToRemove = await this.searchById(id);
        await this.holdRepos.deleteHoldsByProblemId(id, problemToRemove.holdCount);
        await this.problemRepos.delete({
            id: id
        });
    }
    async translateToClientEntity(problem) {
        const clientEntity = {
            id: problem.id,
            problemName: problem.problemName,
            problemGrade: problem.problemGrade,
            authorUsername: problem.author.username,
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
    async patchProblemById(id, problemInfo) {
        console.log("Patch problem:", problemInfo);
        let oldProblem = await this.searchById(id);
        // Patch Problem Attributes
        if (oldProblem.isBenchmark != problemInfo.isBenchmark)
            await this.problemRepos.update(id, { isBenchmark: problemInfo.isBenchmark });
        if (oldProblem.matching != problemInfo.matching)
            await this.problemRepos.update(id, { matching: problemInfo.matching });
        if (oldProblem.problemName != problemInfo.problemName)
            await this.problemRepos.update(id, { problemName: problemInfo.problemName });
        if (oldProblem.problemGrade != problemInfo.problemGrade)
            await this.problemRepos.update(id, { problemGrade: problemInfo.problemGrade });
        if (oldProblem.angle != problemInfo.angle)
            await this.problemRepos.update(id, { angle: problemInfo.angle });
        if (oldProblem.author.username != problemInfo.authorUsername)
            await this.problemRepos.update(id, { author: await this.userRepos.searchByUsername(problemInfo.authorUsername) });
        // Patch BaseHold Entities
        this.holdRepos.patchHoldsByProblemID(id, problemInfo);
        let updatedProblem = await this.searchById(id);
        return await this.translateToClientEntity(updatedProblem);
    }
};
problemRepository = __decorate([
    (0, typeorm_1.EntityRepository)()
], problemRepository);
exports.problemRepository = problemRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbXNSZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZGF0YWJhc2UvcHJvYmxlbXNSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDREQUF5RDtBQUN6RCxzREFBbUQ7QUFDbkQscUNBQXNFO0FBQ3RFLHFEQUFrRDtBQUNsRCxzREFBbUQ7QUFDbkQscURBQWtEO0FBQ2xELDZEQUEwRDtBQUMxRCw4REFBMkQ7QUFFM0Qsa0VBQWlDO0FBSWpDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsb0JBQXlCO0lBQWhFOztRQUNJLGlCQUFZLEdBQUcsSUFBQSx1QkFBYSxFQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLDZCQUFhLENBQUMsQ0FBQztRQUNuRixtRkFBbUY7UUFDbkYsY0FBUyxHQUFHLElBQUksK0JBQWMsRUFBRSxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksdUNBQWtCLEVBQUUsQ0FBQztJQXdMN0MsQ0FBQztJQXRMRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQTRCO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU5QiwwQkFBMEI7UUFDMUIsSUFBSSxVQUFVLEdBQUcsSUFBSSw2QkFBYSxFQUFFLENBQUM7UUFDckMsVUFBVSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQy9DLFVBQVUsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUM3QyxVQUFVLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDakMsVUFBVSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQzdDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFFB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