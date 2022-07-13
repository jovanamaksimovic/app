import { Application } from 'express';
import IApplicationResourcesInterface from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import UserController from './controller';

export default class UserRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResourcesInterface) {
        const userController = new UserController(resources);

        application.get("/user", userController.getAll.bind(userController));
        application.get("/user/:id", userController.getById.bind(userController));
        application.post("/user", userController.add.bind(userController));
        application.put("/user/:id", userController.edit.bind(userController));
        application.delete("/user/:id", userController.delete.bind(userController));
        application.post("/auth/user/register", userController.register.bind(userController));
    }
}