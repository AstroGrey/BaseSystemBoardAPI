"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(users_controller_1.default.listUsers)
            .post(users_middleware_1.default.validateRequiredUserBodyFields, // check if appropriate amount of fields
        users_middleware_1.default.validateEmailFormat, users_middleware_1.default.validateSameEmailDoesntExist, users_middleware_1.default.validateSameUsernameDoesntExist, users_controller_1.default.createUser)
            .delete();
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserIDExists)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            users_middleware_1.default.validateRequiredUserBodyFields,
            //UsersMiddleware.validateSameEmailBelongToSameUser,
            //UsersController.put,
        ]);
        this.app.patch(`/users/:userId`, [
        //UsersMiddleware.validatePatchEmail,
        //UsersController.patch,
        ]);
        this.app.param(`username`, users_middleware_1.default.extractUsername);
        this.app
            .route(`/users/:username`)
            .all(users_middleware_1.default.validateUsernameExists)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFHNUQsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQy9DLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLEdBQUcsQ0FBQywwQkFBZSxDQUFDLFNBQVMsQ0FBQzthQUM5QixJQUFJLENBQ0QsMEJBQWUsQ0FBQyw4QkFBOEIsRUFBRSx3Q0FBd0M7UUFDeEYsMEJBQWUsQ0FBQyxtQkFBbUIsRUFDbkMsMEJBQWUsQ0FBQyw0QkFBNEIsRUFDNUMsMEJBQWUsQ0FBQywrQkFBK0IsRUFDL0MsMEJBQWUsQ0FBQyxVQUFVLENBQzdCO2FBQ0EsTUFBTSxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsMEJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQUMsMEJBQWUsQ0FBQyxvQkFBb0IsQ0FBQzthQUN6QyxHQUFHLENBQUMsMEJBQWUsQ0FBQyxXQUFXLENBQUM7YUFDaEMsTUFBTSxDQUFDLDBCQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7WUFDM0IsMEJBQWUsQ0FBQyw4QkFBOEI7WUFDOUMsb0RBQW9EO1lBQ3BELHNCQUFzQjtTQUN6QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtRQUM3QixxQ0FBcUM7UUFDckMsd0JBQXdCO1NBQzNCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSwwQkFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDO2FBQ3pCLEdBQUcsQ0FBQywwQkFBZSxDQUFDLHNCQUFzQixDQUFDO2FBQzNDLEdBQUcsQ0FBQywwQkFBZSxDQUFDLFdBQVcsQ0FBQzthQUNoQyxNQUFNLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBNUNELGtDQTRDQyJ9