"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const debug_1 = __importDefault(require("debug"));
const EmailFormatValidator = __importStar(require("email-validator"));
const log = debug_1.default('app:users-controller');
class UsersMiddleware {
    async validateRequiredUserBodyFields(// checks to see if request has at least email and password
    req, res, next) {
        if (req.body && req.body.email && req.body.password && req.body.username && req.body.firstName && req.body.lastName) {
            next();
        }
        else {
            res.status(400).send({
                error: `Invalid fields. Please try again idiot`,
            });
        }
    }
    async validateSameUsernameDoesntExist(// checks to see if username exists already 
    req, res, next) {
        const user = await users_service_1.default.getUserByUsername(req.body.username); // checks to see if user exists
        if (user) {
            res.status(400).send({ error: `Username already exists` }); // user exists, cannot create user
        }
        else {
            next(); // user doesnt exist, can move on to create
        }
    }
    async validateEmailFormat(// checks to see if email format is valid
    req, res, next) {
        if (EmailFormatValidator.validate(req.body.email) == false) { // checks if email contains any invalid characters
            res.status(400).send({
                error: `Invalid email format. Please try again`,
            });
        }
        else {
            next();
        }
    }
    async validateUsernameExists(// response to '/users/:userId' request
    req, res, next) {
        const user = await users_service_1.default.getUserByUsername(req.params.username); // searches for user id
        if (user) { // user id exists, move on
            next();
        }
        else { // user id does not exist, error
            res.status(404).send({
                error: `User ${req.params.username} not found`,
            });
        }
    }
    async validateSameEmailDoesntExist(// checks to see if email exists already 
    req, res, next) {
        const user = await users_service_1.default.getUserByEmail(req.body.email); // checks to see if user exists
        if (user) {
            res.status(400).send({ error: `User email already exists` }); // user exists, cannot create user
        }
        else {
            next(); // user doesnt exist, can move on to create
        }
    }
    async extractUserId(req, res, next) {
        req.body.id = req.params.userId;
        next();
    }
    async extractUsername(req, res, next) {
        req.body.username = req.params.username;
        next();
    }
    /*async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await userService.getUserByEmail(req.body.email); // checks to see if user exists
        if (user && user.id === req.params.userId) { // if user exists && has userId, move on
            next();
        } else {
            res.status(400).send({ error: `Invalid email` }); // user email doesnt exist
        }
    }*/
    async validateUserIDExists(// response to '/users/:userId' request
    req, res, next) {
        const user = await users_service_1.default.readById(req.params.userId); // searches for user id
        if (user) { // user id exists, move on
            next();
        }
        else { // user id does not exist, error
            res.status(404).send({
                error: `User ${req.params.userId} not found`,
            });
        }
    }
}
exports.default = new UsersMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL21pZGRsZXdhcmUvdXNlcnMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4RUFBb0Q7QUFDcEQsa0RBQTBCO0FBQzFCLHNFQUF3RDtBQUV4RCxNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDM0QsTUFBTSxlQUFlO0lBQ2pCLEtBQUssQ0FBQyw4QkFBOEIsQ0FBRSwyREFBMkQ7SUFDN0YsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pILElBQUksRUFBRSxDQUFDO1NBQ1Y7YUFBTTtZQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQixLQUFLLEVBQUUsd0NBQXdDO2FBQ2xELENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQywrQkFBK0IsQ0FBRSw0Q0FBNEM7SUFDL0UsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBVyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQywrQkFBK0I7UUFDcEcsSUFBSSxJQUFJLEVBQUU7WUFDTixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtB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