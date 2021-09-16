"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemsController = void 0;
const problems_service_1 = __importDefault(require("../services/problems.service"));
const baseHoldRepository_1 = __importDefault(require("../../database/baseHoldRepository"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('app:problems-controller');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2JsZW1zL2NvbnRyb2xsZXJzL3Byb2JsZW1zLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0ZBQTJEO0FBQzNELDJGQUFtRTtBQUNuRSxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzlELE1BQWEsa0JBQWtCO0lBQzNCLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDcEQsTUFBTSxRQUFRLEdBQUcsTUFBTSwwQkFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUMxRCxNQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFDM0MsTUFBTSwwQkFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixNQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNELEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMsTUFBTSxPQUFPLEdBQUcsTUFBTSw0QkFBa0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sMEJBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDSjtBQXBDRCxnREFvQ0M7QUFFRCxrQkFBZSxJQUFJLGtCQUFrQixFQUFFLENBQUMifQ==