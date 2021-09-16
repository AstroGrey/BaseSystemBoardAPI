"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const argon2_1 = __importDefault(require("argon2"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:users-controller');
class UsersController {
    async listUsers(req, res) {
        const users = await users_service_1.default.list();
        res.status(200).send(users);
    }
    async createUser(req, res) {
        req.body.password = await argon2_1.default.hash(req.body.password);
        const userId = await users_service_1.default.create(req.body);
        res.status(201).send({ id: userId });
    }
    async removeUser(req, res) {
        await users_service_1.default.deleteById(req.params.userId);
        res.status(204).send("user deleted");
    }
    async getUserById(req, res) {
        const user = await users_service_1.default.readById(req.params.userId);
        res.status(200).send(user);
    }
    async deleteAllUsers(req, res) {
        await users_service_1.default.deleteUsers();
        res.status(200).send("All users deleted");
    }
}
exports.default = new UsersController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL2NvbnRyb2xsZXJzL3VzZXJzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw4RUFBcUQ7QUFDckQsb0RBQTRCO0FBQzVCLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMzRCxNQUFNLGVBQWU7SUFDakIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ3ZELE1BQU0sS0FBSyxHQUFHLE1BQU0sdUJBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ3hELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxNQUFNLE1BQU0sR0FBRyxNQUFNLHVCQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDeEQsTUFBTSx1QkFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDekQsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDNUQsTUFBTSx1QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDOUMsQ0FBQztDQVNKO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9