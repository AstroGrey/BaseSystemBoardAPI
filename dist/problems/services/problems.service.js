"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const problemsRepository_1 = require("../../database/problemsRepository");
class ProblemsService {
    constructor() {
        this.ProbsRepos = new problemsRepository_1.problemRepository();
    }
    async create(resource) {
        console.log("problemsService create func");
        return this.ProbsRepos.createProblem(resource);
    }
    async list() {
        console.log("problemsService list func");
        return this.ProbsRepos.getAllProblems();
    }
    async deleteById(id) {
        return this.ProbsRepos.removeById(id);
    }
    async deleteProblems() {
        this.ProbsRepos.deleteAllProblems();
    }
    async patchById(id, resource) {
        return this.ProbsRepos.patchProblemById(id, resource);
    }
    async searchById(id) {
        return this.ProbsRepos.searchById(id);
    }
    async getByAuthor(authorUsername) {
        return this.ProbsRepos.searchByUsername(authorUsername);
    }
    async getByName(name) {
        return this.ProbsRepos.searchByName(name);
    }
}
exports.default = new ProblemsService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2JsZW1zL3NlcnZpY2VzL3Byb2JsZW1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwRUFBc0U7QUFHdEUsTUFBTSxlQUFlO0lBQXJCO1FBQ0ksZUFBVSxHQUFHLElBQUksc0NBQWlCLEVBQUUsQ0FBQztJQTRCekMsQ0FBQztJQTFCRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQTZCO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUNELEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBVTtRQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxLQUFLLENBQUMsY0FBYztRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBVSxFQUFFLFFBQTZCO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNELEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBVTtRQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxLQUFLLENBQUMsV0FBVyxDQUFDLGNBQXNCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFZO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNKO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9