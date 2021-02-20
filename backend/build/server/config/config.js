"use strict";
// containter for all environments
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const environments = {
    development: {},
    production: {}
};
// development environment (default)
environments.development = {
    httpPort: process.env.PORT || 3000,
    envName: 'development',
    postgresUrl: "postgres://rtywcsdc:PjgMTRObbo4DPWT4p5hOjFWm27-8L_RW@ziggy.db.elephantsql.com:5432/rtywcsdc",
    postgres: {
        username: 'rtywcsdc',
        password: 'PjgMTRObbo4DPWT4p5hOjFWm27-8L_RW',
        database: 'rtywcsdc',
        host: 'ziggy.db.elephantsql.com'
    }
};
// production environment 
environments.production = {
    httpPort: process.env.PORT || 3000,
    envName: 'production',
    postgresUrl: process.env.APPNAME_POSTGRES_URL,
    postgres: {
        username: process.env.APPNAME_POSTGRES_USERNAME,
        password: process.env.APPNAME_POSTGRES_PASSWORD,
        database: process.env.APPNAME_POSTGRES_DATABASE,
        host: process.env.APPNAME_POSTGRES_HOST
    }
};
// determine which environment was passed as a command-line argument
const currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';
//chech that the current environment is one of the environments above, if not, default to staging
// export the module
exports.config = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;
//# sourceMappingURL=config.js.map