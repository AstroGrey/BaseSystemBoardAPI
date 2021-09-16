"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userEntity_1 = require("./entities/userEntity");
const typeorm_1 = require("typeorm");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.userRepos = typeorm_1.getConnection(process.env.RDS_DB_NAME).getRepository(userEntity_1.UserEntity);
    }
    //userRepos = getConnection("WoodsTestDB").manager.getRepository(UserEntity); 
    async translateToClientEntity(user) {
        const clientEntity = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: ""
        };
        return clientEntity;
    }
    async createUser(user) {
        let newUser = new userEntity_1.UserEntity();
        // Assign User Attributes
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = user.password;
        // Save new user entity
        let savedUser = this.translateToClientEntity(await this.userRepos.save(newUser));
        return savedUser;
    }
    async getAllUsers() {
        let savedUsers = await this.userRepos.find(userEntity_1.UserEntity);
        if (savedUsers != []) {
            console.log("All users from the db: ", savedUsers);
            return savedUsers;
        }
        else {
            console.log("No users found");
            return [];
        }
    }
    async addProblemToPublishedProblems(newProblem, userId) {
        let user = await this.searchById(userId);
    }
    async searchById(id) {
        let user = await this.userRepos.findOne({
            where: { id: id }
        });
        if (user) {
            console.log("Found user by id");
            //let clientUser = this.translateToClientEntity(user);
            return user;
        }
        else {
            console.log("No user with that id");
            return user;
        }
    }
    async searchByUsername(username) {
        let user = await this.userRepos.findOne({
            where: { username: username }
        });
        if (user) {
            console.log("Found user by username");
            return user;
        }
        else {
            console.log("No user with that username");
            return user;
        }
    }
    async searchByEmail(email) {
        let user = await this.userRepos.findOne({
            where: { email: email }
        });
        if (user) {
            console.log("Found user by email");
            return user;
        }
        else {
            console.log("No user with that email");
            return user;
        }
    }
    async deleteAllUsers() {
        console.log("deleteAllUsers");
        let users = await this.getAllUsers();
        await this.userRepos.remove(users);
    }
    async patchUserById(id, userInfo) {
        console.log("Patch user:", userInfo);
        let oldUser = await this.searchById(id);
        if (oldUser.firstName != userInfo.firstName)
            await this.userRepos.update(id, { firstName: userInfo.firstName });
        if (oldUser.lastName != userInfo.lastName)
            await this.userRepos.update(id, { firstName: userInfo.lastName });
        if (oldUser.username != userInfo.username)
            await this.userRepos.update(id, { username: userInfo.username });
        if (oldUser.username != userInfo.username)
            await this.userRepos.update(id, { username: userInfo.username });
        let updatedUser = await this.searchById(id);
        return await this.translateToClientEntity(updatedUser);
    }
    async removeById(id) {
        await this.userRepos.delete({
            id: id
        });
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository()
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kYXRhYmFzZS91c2VyUmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQscUNBQXNFO0FBTXRFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxvQkFBdUI7SUFBM0Q7O1FBQ0ksY0FBUyxHQUFHLHVCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsdUJBQVUsQ0FBQyxDQUFDO0lBd0hqRixDQUFDO0lBdkhHLDhFQUE4RTtJQUU5RSxLQUFLLENBQUMsdUJBQXVCLENBQUMsSUFBZ0I7UUFDMUMsTUFBTSxZQUFZLEdBQXFCO1lBQ25DLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFzQjtRQUNuQyxJQUFJLE9BQU8sR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUUvQix5QkFBeUI7UUFDekIsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFD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