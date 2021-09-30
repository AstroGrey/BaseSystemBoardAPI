import { problemRepository } from '../../database/problemsRepository';
import { ClientProblemEntity } from  '../../common/interfaces/clientProblemEntity'

class ProblemsService{ 
    ProbsRepos = new problemRepository();

    async create(resource: ClientProblemEntity) {
        console.log("problemsService create func");
        return this.ProbsRepos.createProblem(resource);
    }
    async listByAngle(angle: number){
        console.log("problemsService list func");
        return this.ProbsRepos.convertClimbsAroundAngle(angle);
    }
    async list(){
        console.log("problemsService list func");
        return this.ProbsRepos.getAllProblems();
    }
    async deleteById(id: string){
        return this.ProbsRepos.removeById(id);
    }
    async deleteProblems(){
        this.ProbsRepos.deleteAllProblems();
    }
    async patchById(id: string, resource: ClientProblemEntity): Promise<ClientProblemEntity> {
        return this.ProbsRepos.patchProblemById(id, resource);
    }
    async searchById(id: string) {
        return this.ProbsRepos.searchById(id);
    }
    async getByAuthor(authorUsername: string) {
        return this.ProbsRepos.searchByUsername(authorUsername);
    }
    async getByName(name: string) {
        return this.ProbsRepos.searchByName(name);
    }
}

export default new ProblemsService();
