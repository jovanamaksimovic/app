import IApplicationRecources from "./IApplicationResources.interface";
import IServices from "./IServices.interface";

export default abstract class BaseController {
    private resources: IApplicationRecources;

    constructor(resources: IApplicationRecources){
        this.resources = resources;
    }

    protected get services(): IServices {
        return this.resources.services;
    }
}