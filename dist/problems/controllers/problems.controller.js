"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemsController = void 0;
const problems_service_1 = __importDefault(require("../services/problems.service"));
const baseHoldRepository_1 = __importDefault(require("../../database/baseHoldRepository"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:problems-controller');
class ProblemsController {
    async listProblems(req, res) {
        console.log("problemsController listProblems func");
        const problems = await problems_service_1.default.list();
        res.status(200).send(problems);
    }
    async createProblem(req, res) {
        console.log("problemsController createProblem func");
        const problem = await problems_service_1.default.create(req.body);
        res.status(201).send({ problem });
    }
    async getProblemById(req, res) {
        console.log("controller get Problem by Id", req.params.id);
        const problem = await problems_service_1.default.searchById(req.params.id);
        res.status(201).send({ problem });
    }
    async deleteAllProblems(req, res) {
        console.log("controller deleteAllProblems");
        await problems_service_1.default.deleteProblems();
        res.status(204).send("All problems deleted");
    }
    async patchById(req, res) {
        console.log(req.body);
        const problem = await problems_service_1.default.patchById(req.body.id, req.body);
        res.status(201).send({ problem });
    }
    async createBaseHold(req, res) {
        console.log("controller createBaseHold");
        const newHold = await baseHoldRepository_1.default.createBaseHold(req.body);
        res.status(201).send({ newHold });
    }
    async removeProblemById(req, res) {
        console.log("controller removeProblemById", req.params.id);
        await problems_service_1.default.deleteById(req.params.id);
        res.status(204).send("Problem deleted");
    }
}
exports.ProblemsController = ProblemsController;
exports.default = new ProblemsController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2JsZW1zL2NvbnRyb2xsZXJzL3Byb2JsZW1zLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0ZBQTJEO0FBQzNELDJGQUFtRTtBQUNuRSxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDOUQsTUFBYSxrQkFBa0I7SUFDM0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUNwRCxNQUFNLFFBQVEsR0FBRyxNQUFNLDBCQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDckQsTUFBTSxPQUFPLEdBQUcsTUFBTSwwQkFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRCxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzFELE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQTtRQUMzQyxNQUFNLDBCQUFlLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN6QyxNQUFNLE9BQU8sR0FBRyxNQUFNLDRCQUFrQixDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0QsTUFBTSwwQkFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNKO0FBcENELGdEQW9DQztBQUVELGtCQUFlLElBQUksa0JBQWtCLEVBQUUsQ0FBQyJ9