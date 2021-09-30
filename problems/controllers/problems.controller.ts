import express from 'express';
import problemsService from '../services/problems.service';
import baseHoldRepository from '../../database/baseHoldRepository';
import debug from 'debug';

const log: debug.IDebugger = debug('app:problems-controller');
export class ProblemsController {
    async listProblems(req: express.Request, res: express.Response) {
        console.log("problemsController listProblems func");
        const problems = await problemsService.list();
        res.status(200).send(problems);
    }
    async listProblemsByAngle(req: express.Request, res: express.Response) {
        console.log("problemsController listProblemsByAngle func");
        const problems = await problemsService.listByAngle(req.params.angle);
        res.status(200).send(problems);
    }
    async createProblem(req: express.Request, res: express.Response) {
        console.log("problemsController createProblem func");
        const problem = await problemsService.create(req.body);
        res.status(201).send({ problem });
    }
    async getProblemById(req: express.Request, res: express.Response) {
        console.log("controller get Problem by Id", req.params.id)
        const problem = await problemsService.searchById(req.params.id);
        res.status(201).send({ problem });
    }
    async deleteAllProblems(req: express.Request, res: express.Response){
        console.log("controller deleteAllProblems")
        await problemsService.deleteProblems();
        res.status(204).send("All problems deleted");
    }
    async patchById(req: express.Request, res: express.Response) {
        console.log(req.body);
        const problem = await problemsService.patchById(req.body.id, req.body);
        res.status(201).send({ problem });
    }
    async createBaseHold(req: express.Request, res: express.Response){
        console.log("controller createBaseHold");
        const newHold = await baseHoldRepository.createBaseHold(req.body);
        res.status(201).send({ newHold });
    }
    async removeProblemById(req: express.Request, res: express.Response) {
        console.log("controller removeProblemById", req.params.id);
        await problemsService.deleteById(req.params.id);
        res.status(204).send("Problem deleted");
    }
}

export default new ProblemsController();
