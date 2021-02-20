import { Sequelize } from 'sequelize';
import  {config} from '../config/config';

let sequelize: any;
sequelize = new Sequelize(config.postgres.database,config.postgres.username,config.postgres.password,{
    dialect:'postgres',
    host:config.postgres.host
});
export const db = {
    sequelize: sequelize,
    Sequelize: Sequelize
};