import * as mysql2 from 'mysql2/promise'
import IServices from './IServices.interface';

export default interface IApplicationRecources {
    databaseConnection: mysql2.Connection;
    services?: IServices;
}