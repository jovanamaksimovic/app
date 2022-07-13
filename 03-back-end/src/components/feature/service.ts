import BaseService from "../../common/BaseService";
import CategoryService from "../category/service";
import FeatureModel from "./model";
import * as mysql2 from 'mysql2/promise';
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { urlToHttpOptions } from "url";
import CategoryModel from "../category/model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddFeature } from "./dto/AddFeature";
import { resolve } from "path";
import { features } from "process";
import { IEditFeature } from "./dto/EditFeature";
import { error } from "console";

class FeatureModelAdapterOptions implements IModelAdapterOptions{
    loadCategory: boolean = false;
}

class FeatureService extends BaseService<FeatureModel>{

    protected async adaptModel(
        data: any,
        options: Partial<FeatureModelAdapterOptions>
    ): Promise<FeatureModel>{
        const item: FeatureModel = new FeatureModel();

        item.featureId = +(data?.feature_id);
        item.name = data?.name;
        item.categoryId = +(data?.category_id);

        if(options.loadCategory && item.categoryId){
            const result = await this.services.categoryService.getById(item.categoryId);
            item.category = result as CategoryModel;
        }

        return item;
    }

    public async getById(
        featureId: number,
        options: Partial<FeatureModelAdapterOptions> = { },
    ): Promise<FeatureModel|null|IErrorResponse>{
        return await this.getByIdFromTable("feature", featureId, options);
    }

    public async getAllByCategoryId(
        categoryId: number,
    ):Promise<FeatureModel[]>{
        const allFeature: FeatureModel[]=[];

        let currentParent:  CategoryModel|null = await this.services.categoryService.getById(categoryId) as CategoryModel;

        while(currentParent !== null){
            allFeature.push(
                ...await this.getAllByFieldNameFromTable(
                    "feature",
                    "category_id",
                    currentParent.categoryId,
                ) as FeatureModel[]
            );

            currentParent = await this.services.categoryService.getById(
                currentParent.parentCategoryId
            ) as CategoryModel | null;
        }
        return allFeature;
    }
    
    public async add(data:IAddFeature):Promise<FeatureModel|IErrorResponse>{
        return new Promise<FeatureModel|IErrorResponse>(resolve => {
            const sql = "INSERT feature SET name = ?, category_id = ?;";
            this.db.execute(sql, [data.name, data.categoryId])
                .then(async result => {
                    const insertInfo: any = result[0];
                    const newId: number = +(insertInfo?.insertId);
                    resolve(await this.getById(newId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
        });
    }

    public async edit(
        featureId: number,
        data: IEditFeature,
        options: Partial<FeatureModelAdapterOptions> = { },
    ): Promise<FeatureModel|IErrorResponse>{
        return new Promise<FeatureModel|IErrorResponse>(resolve => {
            const sql = "UPDATE feature SET name = ? WHERE feature_id = ?;";
            this.db.execute(sql, [data.name, featureId])
                .then(async result => {
                    resolve(await this.getById(featureId, options));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
        });
    }
}
export default FeatureService;