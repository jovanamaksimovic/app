import * as express from 'express';
import IApplicationRecources from "./IApplicationResources.interface";

export default interface IRouter {
    setupRoutes(application: express.Application, resources: IApplicationRecources);
}