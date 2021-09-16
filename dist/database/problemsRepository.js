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
        this.problemRepos = typeorm_1.getConnection(process.env.RDS_DB_NAME).getRepository(problemEntity_1.ProblemEntity);
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
    typeorm_1.EntityRepository()
], problemRepository);
exports.problemRepository = problemRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbXNSZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZGF0YWJhc2UvcHJvYmxlbXNSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDREQUF5RDtBQUN6RCxzREFBbUQ7QUFDbkQscUNBQXNFO0FBQ3RFLHFEQUFrRDtBQUNsRCxzREFBbUQ7QUFDbkQscURBQWtEO0FBQ2xELDZEQUEwRDtBQUMxRCw4REFBMkQ7QUFFM0Qsa0VBQWlDO0FBSWpDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsb0JBQXlCO0lBQWhFOztRQUNJLGlCQUFZLEdBQUcsdUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyw2QkFBYSxDQUFDLENBQUM7UUFDbkYsbUZBQW1GO1FBQ25GLGNBQVMsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztRQUNqQyxjQUFTLEdBQUcsSUFBSSwrQkFBYyxFQUFFLENBQUM7UUFDakMsa0JBQWEsR0FBRyxJQUFJLHVDQUFrQixFQUFFLENBQUM7SUF3TDdDLENBQUM7SUF0TEcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUE0QjtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFOUIsMEJBQTBCO1FBQzFCLElBQUksVUFBVSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO1FBQ3JDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUMvQyxVQUFVLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDN0MsVUFBVSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUM3QyxVQUFVLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENB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