"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const argon2_1 = __importDefault(require("argon2"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('app:users-controller');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL2NvbnRyb2xsZXJzL3VzZXJzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw4RUFBcUQ7QUFDckQsb0RBQTRCO0FBQzVCLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDM0QsTUFBTSxlQUFlO0lBQ2pCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUN2RCxNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUN4RCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLGdCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsTUFBTSxNQUFNLEdBQUcsTUFBTSx1QkFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ3hELE1BQU0sdUJBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ3pELE1BQU0sSUFBSSxHQUFHLE1BQU0sdUJBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzVELE1BQU0sdUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FTSjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==