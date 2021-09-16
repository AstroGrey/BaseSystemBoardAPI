"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseHoldRepository = void 0;
const typeorm_1 = require("typeorm");
const baseHoldEntity_1 = require("./entities/baseHoldEntity");
let baseHoldRepository = class baseHoldRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.baseHoldRepos = (0, typeorm_1.getConnection)(process.env.RDS_DB_NAME).getRepository(baseHoldEntity_1.BaseHoldEntity);
        /*async getLocationById(baseHoldId: number): Promise <number>{
            let baseHold = await this.baseHoldRepos.find({
                where: {id : baseHoldId}
            })
            return baseHold.location;
        }
    
        async deleteAllHolds(){
            console.log("deleteAllProblems");
            let baseHoldRepos = getConnection(process.env.RDS_DB_NAME).getRepository(BaseHoldEntity);
            let problems = await this.getAllProblems();
            let holdRepos = new holdRepository();
            for(var i = 0; i < problems.length; i++){
                holdRepos.deleteHoldsByProblemId(problems[i].id, problems[i].holdCount);
            }
            await probRepos.remove(
                problems
            );
        }
    
        async removeById(id: any){
            console.log("Remove problem of id:", id);
            let probRepos = getConnection(process.env.RDS_DB_NAME).getRepository(ProblemEntity);
            let problemToRemove = await this.searchById(id);
            let holdRepos = new holdRepository();
            await holdRepos.deleteHoldsByProblemId(id, problemToRemove.holdCount);
            await probRepos.delete({
                id : id
            });
        }*/
    }
    //baseHoldRepos= getConnection().getRepository(BaseHoldEntity);
    async createBaseHold(baseHold) {
        let newBaseHold = new baseHoldEntity_1.BaseHoldEntity();
        newBaseHold.descriptor = baseHold.descriptor;
        newBaseHold.location = baseHold.location;
        await this.baseHoldRepos.save(newBaseHold);
        return newBaseHold;
    }
    async getBaseHoldByLocation(location) {
        let baseHold = await this.baseHoldRepos.findOne({
            where: { location: location }
        });
        if (baseHold) {
            return baseHold;
        }
        else {
            return baseHold;
        }
    }
};
baseHoldRepository = __decorate([
    (0, typeorm_1.EntityRepository)()
], baseHoldRepository);
exports.baseHoldRepository = baseHoldRepository;
exports.default = new baseHoldRepository();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUhvbGRSZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZGF0YWJhc2UvYmFzZUhvbGRSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFDQUFvRjtBQUNwRiw4REFBMkQ7QUFHM0QsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxvQkFBMEI7SUFBbEU7O1FBQ0ksa0JBQWEsR0FBRSxJQUFBLHVCQUFhLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsK0JBQWMsQ0FBQyxDQUFDO1FBdUJwRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0E2Qkc7SUFDUCxDQUFDO0lBcERHLCtEQUErRDtJQUUvRCxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQXdCO1FBQ3pDLElBQUksV0FBVyxHQUFHLElBQUksK0JBQWMsRUFBRSxDQUFDO1FBQ3ZDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUM3QyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDekMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQyxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFFBQWdCO1FBQ3hDLElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDNUMsS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFHLFFBQVEsRUFBRTtTQUM1QixDQUFDLENBQUM7UUFDUCxJQUFHLFFBQVEsRUFBQztZQUNSLE9BQU8sUUFBUSxDQUFDO1NBQ25CO2FBQ0c7WUFDQSxPQUFPLFFBQVMsQ0FBQztTQUNwQjtJQUNMLENBQUM7Q0FnQ0osQ0FBQTtBQXREWSxrQkFBa0I7SUFEOUIsSUFBQSwwQkFBZ0IsR0FBRTtHQUNOLGtCQUFrQixDQXNEOUI7QUF0RFksZ0RBQWtCO0FBd0QvQixrQkFBZSxJQUFJLGtCQUFrQixFQUFFLENBQUMifQ==