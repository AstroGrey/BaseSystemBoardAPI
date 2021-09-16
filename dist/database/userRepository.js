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
        this.userRepos = (0, typeorm_1.getConnection)(process.env.RDS_DB_NAME).getRepository(userEntity_1.UserEntity);
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
    (0, typeorm_1.EntityRepository)()
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kYXRhYmFzZS91c2VyUmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQscUNBQXNFO0FBTXRFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxvQkFBdUI7SUFBM0Q7O1FBQ0ksY0FBUyxHQUFHLElBQUEsdUJBQWEsRUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyx1QkFBVSxDQUFDLENBQUM7SUF3SGpGLENBQUM7SUF2SEcsOEVBQThFO0lBRTlFLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxJQUFnQjtRQUMxQyxNQUFNLFlBQVksR0FBcUI7WUFDbkMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQXNCO1FBQ25DLElBQUksT0FBTyxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBRS9CLHlCQUF5QjtRQUN6QixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJ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