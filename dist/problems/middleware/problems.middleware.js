"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const problems_service_1 = __importDefault(require("../services/problems.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:problems-controller');
class ProblemsMiddleware {
    async validateRequiredProblemBodyFields(// checks to see if request has required fields
    req, res, next) {
        console.log(req.body);
        if (req.body &&
            req.body.problemName &&
            req.body.problemGrade &&
            req.body.author &&
            req.body.angle &&
            req.body.isBenchmark &&
            req.body.matching &&
            req.body.holdList) {
            next();
        }
        else {
            res.status(400).send({
                error: `Invalid fields. Please try again`,
            });
        }
    }
    async validateSameNameDoesntExist(// checks to see if problem name exists already 
    req, res, next) {
        const problem = await problems_service_1.default.getByName(req.body.problemName); // checks to see if user exists
        if (problem) {
            res.status(400).send({ error: `Problem name already exists` }); // user exists, cannot create user
        }
        else {
            next();
        }
    }
    async validateProblemExists(// response to '/users/:userId' request
    req, res, next) {
        const problem = await problems_service_1.default.searchById(req.params.id); // searches for user id
        if (problem) {
            next();
        }
        else {
            res.status(404).send({
                error: `Problem ${req.params.problemId} not found`,
            });
        }
    }
    async extractProblemId(req, res, next) {
        req.body.id = req.params.id;
        next();
    }
}
exports.default = new ProblemsMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbXMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2JsZW1zL21pZGRsZXdhcmUvcHJvYmxlbXMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG9GQUEwRDtBQUMxRCxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDOUQsTUFBTSxrQkFBa0I7SUFDcEIsS0FBSyxDQUFDLGlDQUFpQyxDQUFFLCtDQUErQztJQUNwRixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyQixJQUFJLEdBQUcsQ0FBQyxJQUFJO1lBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDZCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ2xCLElBQUksRUFBRSxDQUFDO1NBQ1Y7YUFBTTtZQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQixLQUFLLEVBQUUsa0NBQWtDO2FBQzVDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQywyQkFBMkIsQ0FBRSxnREFBZ0Q7SUFDL0UsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsTUFBTSxPQUFPLEdBQUcsTUFBTSwwQkFBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsK0JBQStCO1FBQ3JHLElBQUksT0FBTyxFQUFFO1lBQ1QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO1NBQ3JHO2FBQU07WUFDSCxJQUFJLEVBQUUsQ0FBQztTQUNWO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxxQkFBcUIsQ0FBRSx1Q0FBdUM7SUFDaEUsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsTUFBTSxPQUFPLEdBQUcsTUFBTSwwQkFBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1FBQ3ZGLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxFQUFFLENBQUM7U0FDVjthQUFNO1lBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLEtBQUssRUFBRSxXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxZQUFZO2FBQ3JELENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDNUIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLGtCQUFrQixFQUFFLENBQUMifQ==