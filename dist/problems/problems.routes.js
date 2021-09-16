"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemsRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const problems_controller_1 = __importDefault(require("./controllers/problems.controller"));
const problems_middleware_1 = __importDefault(require("./middleware/problems.middleware"));
class ProblemsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'ProblemsRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/problems`)
            .get(problems_controller_1.default.listProblems)
            .post(problems_middleware_1.default.validateRequiredProblemBodyFields, // check if appropriate amount of fields
        problems_middleware_1.default.validateSameNameDoesntExist, problems_controller_1.default.createProblem);
        //.delete(ProblemsController.deleteAllProblems);
        this.app.param(`id`, problems_middleware_1.default.extractProblemId);
        this.app
            .route(`/problems/:id`)
            .all(problems_middleware_1.default.validateProblemExists)
            .get(problems_controller_1.default.getProblemById)
            .delete(problems_controller_1.default.removeProblemById)
            .patch(problems_controller_1.default.patchById);
        this.app
            .route(`/basehold`)
            //.get(ProblemsController.listProblems)
            .post(problems_controller_1.default.createBaseHold);
        //.delete(ProblemsController.deleteAllProblems);
        /*this.app.put(`/problems/:id`, [
            ProblemsMiddleware.validateRequiredProblemBodyFields,
            //ProblemsController.put,
        ]);
        this.app.patch(`/problems/:id`, [
           // ProblemsController.patch,
        ]);*/
        return this.app;
    }
}
exports.ProblemsRoutes = ProblemsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbXMucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcHJvYmxlbXMvcHJvYmxlbXMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUFvRTtBQUNwRSw0RkFBbUU7QUFDbkUsMkZBQWtFO0FBSWxFLE1BQWEsY0FBZSxTQUFRLHlDQUFrQjtJQUNsRCxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQzthQUNsQixHQUFHLENBQUMsNkJBQWtCLENBQUMsWUFBWSxDQUFDO2FBQ3BDLElBQUksQ0FDRCw2QkFBa0IsQ0FBQyxpQ0FBaUMsRUFBRSx3Q0FBd0M7UUFDOUYsNkJBQWtCLENBQUMsMkJBQTJCLEVBQzlDLDZCQUFrQixDQUFDLGFBQWEsQ0FDbkMsQ0FBQTtRQUNELGdEQUFnRDtRQUVwRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsNkJBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxlQUFlLENBQUM7YUFDdEIsR0FBRyxDQUFDLDZCQUFrQixDQUFDLHFCQUFxQixDQUFDO2FBQzdDLEdBQUcsQ0FBQyw2QkFBa0IsQ0FBQyxjQUFjLENBQUM7YUFDdEMsTUFBTSxDQUFDLDZCQUFrQixDQUFDLGlCQUFpQixDQUFDO2FBQzVDLEtBQUssQ0FBQyw2QkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDbkIsdUNBQXVDO2FBQ3RDLElBQUksQ0FBQyw2QkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN4QyxnREFBZ0Q7UUFDcEQ7Ozs7OzthQU1LO1FBRUwsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQXZDRCx3Q0F1Q0MifQ==