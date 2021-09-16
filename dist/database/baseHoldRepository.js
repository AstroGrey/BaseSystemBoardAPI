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
        this.baseHoldRepos = typeorm_1.getConnection(process.env.RDS_DB_NAME).getRepository(baseHoldEntity_1.BaseHoldEntity);
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
    typeorm_1.EntityRepository()
], baseHoldRepository);
exports.baseHoldRepository = baseHoldRepository;
exports.default = new baseHoldRepository();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUhvbGRSZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZGF0YWJhc2UvYmFzZUhvbGRSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFDQUFvRjtBQUNwRiw4REFBMkQ7QUFHM0QsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxvQkFBMEI7SUFBbEU7O1FBQ0ksa0JBQWEsR0FBRSx1QkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLCtCQUFjLENBQUMsQ0FBQztRQXVCcEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBNkJHO0lBQ1AsQ0FBQztJQXBERywrREFBK0Q7SUFFL0QsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUF3QjtRQUN6QyxJQUFJLFdBQVcsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztRQUN2QyxXQUFXLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDN0MsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3pDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxRQUFnQjtRQUN4QyxJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQzVDLEtBQUssRUFBRSxFQUFDLFFBQVEsRUFBRyxRQUFRLEVBQUU7U0FDNUIsQ0FBQyxDQUFDO1FBQ1AsSUFBRyxRQUFRLEVBQUM7WUFDUixPQUFPLFFBQVEsQ0FBQztTQUNuQjthQUNHO1lBQ0EsT0FBTyxRQUFTLENBQUM7U0FDcEI7SUFDTCxDQUFDO0NBZ0NKLENBQUE7QUF0RFksa0JBQWtCO0lBRDlCLDBCQUFnQixFQUFFO0dBQ04sa0JBQWtCLENBc0Q5QjtBQXREWSxnREFBa0I7QUF3RC9CLGtCQUFlLElBQUksa0JBQWtCLEVBQUUsQ0FBQyJ9