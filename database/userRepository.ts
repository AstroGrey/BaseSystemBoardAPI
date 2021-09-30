import { UserEntity } from './entities/userEntity';
import { EntityRepository, Repository, getConnection } from "typeorm";
import { ProblemEntity } from './entities/problemEntity';
import { ClientUserEntity } from '../common/interfaces/clientUserEntiy';
import { ClientProblemEntity } from '../common/interfaces/clientProblemEntity';

@EntityRepository()
export class UserRepository extends Repository <UserEntity> {
    userRepos = getConnection(process.env.RDS_DB_NAME).getRepository(UserEntity); 
    //userRepos = getConnection("WoodsTestDB").manager.getRepository(UserEntity); 
   
    async translateToClientEntity(user: UserEntity): Promise <ClientUserEntity>{    
        const clientEntity: ClientUserEntity = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: ""
        };
        return clientEntity;
    }

    async createUser(user: ClientUserEntity): Promise <ClientUserEntity>{
        let newUser = new UserEntity();

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

    async getAllUsers(): Promise <UserEntity[]> {
        let savedUsers = await this.userRepos.find(UserEntity);
        if(savedUsers != []){
            console.log("All users from the db: ", savedUsers);
            return savedUsers;
        }
        else{
            console.log("No users found");
            return []; 
        }
    }

    async addProblemToPublishedProblems(newProblem: ClientProblemEntity, userId: UserEntity){
        
    }

    async searchById(id: any): Promise <UserEntity>{
        let user = await this.userRepos.findOne({
            where: {id : id}
        });
        if(user){
            console.log("Found user by id");
            //let clientUser = this.translateToClientEntity(user);
            return user;
        }
        else{
            console.log("No user with that id");
            return user!;
       }
    }

    async searchByUsername(username: string): Promise<UserEntity>{
        let user = await this.userRepos.findOne({
            where: {username : username}
        });
        if(user){
            console.log("Found user by username");
            return user;
        }
        else{
            console.log("No user with that username");
            return user!;
       }
    }

    async searchByEmail(email: string): Promise<UserEntity>{
        let user = await this.userRepos.findOne({
            where: {email : email}
        });
        if(user){
            console.log("Found user by email");
            return user;
        }
        else{
            console.log("No user with that email");
            return user!;
       }
    }

    async deleteAllUsers(){
        console.log("deleteAllUsers");
        let users = await this.getAllUsers();
        await this.userRepos.remove(
            users
        );
    }

    async patchUserById(id: any, userInfo: ClientUserEntity): Promise <ClientUserEntity>{
        console.log("Patch user:", userInfo);
        let oldUser = await this.searchById(id);

        if(oldUser.firstName != userInfo.firstName)
            await this.userRepos.update( id, { firstName: userInfo.firstName });
        if(oldUser.lastName != userInfo.lastName)
            await this.userRepos.update( id, { firstName: userInfo.lastName });
        if(oldUser.username != userInfo.username)
            await this.userRepos.update( id, { username: userInfo.username });
        if(oldUser.username != userInfo.username)
            await this.userRepos.update( id, { username: userInfo.username });

        let updatedUser = await this.searchById(id);
        return await this.translateToClientEntity(updatedUser);
    }

    async removeById(id: any){
        await this.userRepos.delete({
            id : id
        });
    }
}