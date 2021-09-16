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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
const log = (0, debug_1.default)('app:users-controller');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL21pZGRsZXdhcmUvdXNlcnMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4RUFBb0Q7QUFDcEQsa0RBQTBCO0FBQzFCLHNFQUF3RDtBQUV4RCxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMzRCxNQUFNLGVBQWU7SUFDakIsS0FBSyxDQUFDLDhCQUE4QixDQUFFLDJEQUEyRDtJQUM3RixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakgsSUFBSSxFQUFFLENBQUM7U0FDVjthQUFNO1lBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLEtBQUssRUFBRSx3Q0FBd0M7YUFDbEQsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLCtCQUErQixDQUFFLDRDQUE0QztJQUMvRSxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixNQUFNLElBQUksR0FBRyxNQUFNLHVCQUFXLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtRQUNwRyxJQUFJLElBQUksRUFBRTtZQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVB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