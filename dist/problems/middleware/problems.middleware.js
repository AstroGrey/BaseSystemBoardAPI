"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const problems_service_1 = __importDefault(require("../services/problems.service"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('app:problems-controller');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbXMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2JsZW1zL21pZGRsZXdhcmUvcHJvYmxlbXMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG9GQUEwRDtBQUMxRCxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzlELE1BQU0sa0JBQWtCO0lBQ3BCLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBRSwrQ0FBK0M7SUFDcEYsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckIsSUFBSSxHQUFHLENBQUMsSUFBSTtZQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVztZQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNqQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUNsQixJQUFJLEVBQUUsQ0FBQztTQUNWO2FBQU07WUFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakIsS0FBSyxFQUFFLGtDQUFrQzthQUM1QyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsMkJBQTJCLENBQUUsZ0RBQWdEO0lBQy9FLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCO1FBRTFCLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtRQUNyRyxJQUFJLE9BQU8sRUFBRTtZQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLDZCQUE2QixFQUFFLENBQUMsQ0FBQyxDQUFDLGtDQUFrQztTQUNyRzthQUFNO1lBQ0gsSUFBSSxFQUFFLENBQUM7U0FDVjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMscUJBQXFCLENBQUUsdUNBQXVDO0lBQ2hFLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCO1FBRTFCLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtRQUN2RixJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksRUFBRSxDQUFDO1NBQ1Y7YUFBTTtZQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQixLQUFLLEVBQUUsV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsWUFBWTthQUNyRCxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCLENBQ2xCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCO1FBRTFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzVCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNKO0FBRUQsa0JBQWUsSUFBSSxrQkFBa0IsRUFBRSxDQUFDIn0=