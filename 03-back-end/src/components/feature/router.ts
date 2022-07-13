import * as express from 'express';
import IApplicationRecources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

import FeatureController from './controller';
import FeatureService from './service';
export default class FeatureRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationRecources){
        const featureController: FeatureController = new FeatureController(resources);

        application.get("/feature/:id", featureController.getById.bind(featureController));
        application.get("/category/:cid/feature", featureController.getAllInCategory.bind(featureController));
        application.post("/feature", featureController.add.bind(featureController));
        application.put("/feature/:id", featureController.edit.bind(featureController));


    }
}