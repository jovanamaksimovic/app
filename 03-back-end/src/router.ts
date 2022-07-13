import * as express from 'express';
import IApplicationRecources from './common/IApplicationResources.interface';
import IRouter from './common/IRouter.interface';


export default class Router{
    static setupRoutes(application: express.Application, resources: IApplicationRecources, routers: IRouter[]){
       for(const router of routers){
           router.setupRoutes(application, resources);
       } 
    }
}