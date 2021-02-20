"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
let sequelize;
sequelize = new sequelize_1.Sequelize(config_1.config.postgres.database, config_1.config.postgres.username, config_1.config.postgres.password, {
    dialect: 'postgres',
    host: config_1.config.postgres.host
});
exports.db = {
    sequelize: sequelize,
    Sequelize: sequelize_1.Sequelize
};
//# sourceMappingURL=index.js.map