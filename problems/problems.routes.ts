import { CommonRoutesConfig } from '../common/common.routes.config';
import ProblemsController from './controllers/problems.controller';
import ProblemsMiddleware from './middleware/problems.middleware';
import baseHoldRepository from '../database/baseHoldRepository';
import express from 'express';

export class ProblemsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ProblemsRoutes');
    }

    configureRoutes() {
        this.app
            .route(`/problems`)
            .get(ProblemsController.listProblems)
            .post(
                ProblemsMiddleware.validateRequiredProblemBodyFields, // check if appropriate amount of fields
                ProblemsMiddleware.validateSameNameDoesntExist,
                ProblemsController.createProblem
            )
            //.delete(ProblemsController.deleteAllProblems);

        this.app.param(`angle`, ProblemsMiddleware.extractProblemAngle);
        this.app
            .route(`/problems/:angle`)
            .get(ProblemsController.listProblemsByAngle)

        this.app.param(`id`, ProblemsMiddleware.extractProblemId);
        this.app
            .route(`/problems/id/:id`)
            .all(ProblemsMiddleware.validateProblemExists)
            .get(ProblemsController.getProblemById)
            .delete(ProblemsController.removeProblemById)
            .patch(ProblemsController.patchById);

        this.app
            .route(`/basehold`)
            //.get(ProblemsController.listProblems)
            .post(ProblemsController.createBaseHold)
            //.delete(ProblemsController.deleteAllProblems);
        /*this.app.put(`/problems/:id`, [
            ProblemsMiddleware.validateRequiredProblemBodyFields,
            //ProblemsController.put,
        ]);
        this.app.patch(`/problems/:id`, [
           // ProblemsController.patch,
        ]);*/

        return this.app;
    }
}
