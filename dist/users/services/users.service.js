"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("../../database/userRepository");
class UsersService {
    constructor() {
        this.usersRepos = new userRepository_1.UserRepository();
    }
    async create(resource) {
        return this.usersRepos.createUser(resource);
    }
    async list() {
        return this.usersRepos.getAllUsers();
    }
    async getUserByEmail(email) {
        return this.usersRepos.searchByEmail(email);
    }
    async getUserByUsername(username) {
        return this.usersRepos.searchByUsername(username);
    }
    async deleteById(id) {
        return this.usersRepos.removeById(id);
    }
    async readById(id) {
        return this.usersRepos.searchById(id);
    }
    async deleteUsers() {
        return this.usersRepos.deleteAllUsers();
    }
    async patchById(id, resource) {
        return this.usersRepos.patchUserById(id, resource);
    }
}
exports.default = new UsersService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL3NlcnZpY2VzL3VzZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxrRUFBK0Q7QUFFL0QsTUFBTSxZQUFZO0lBQWxCO1FBQ0ksZUFBVSxHQUFHLElBQUksK0JBQWMsRUFBRSxDQUFDO0lBMEJ0QyxDQUFDO0lBeEJHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBMEI7UUFDbkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsS0FBSyxDQUFDLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUNELEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBYTtRQUM5QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsUUFBZ0I7UUFDcEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDRCxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQVU7UUFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFVO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELEtBQUssQ0FBQyxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFDRCxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQVUsRUFBRSxRQUEwQjtRQUNsRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLFlBQVksRUFBRSxDQUFDIn0=