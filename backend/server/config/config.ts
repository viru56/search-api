// containter for all environments

const environments = {
    development: {},
    production:{}
};
interface environmentType {
    httpPort: number,
    envName:string,
    postgresUrl:string,
    postgres:{
    username: string,
    password:string,
    database: string,
    host: string
    }
}
// development environment (default)
environments.development = {
    httpPort: process.env.PORT || 3000,
    envName: 'development',
    postgresUrl:"postgres://rtywcsdc:PjgMTRObbo4DPWT4p5hOjFWm27-8L_RW@ziggy.db.elephantsql.com:5432/rtywcsdc",
    postgres:{
        username: 'rtywcsdc',
        password:'PjgMTRObbo4DPWT4p5hOjFWm27-8L_RW',
        database: 'rtywcsdc',
        host: 'ziggy.db.elephantsql.com'
    }
}

// production environment 
environments.production = {
    httpPort: process.env.PORT || 3000,
    envName: 'production',
    postgresUrl:process.env.APPNAME_POSTGRES_URL,
    postgres:{
        username: process.env.APPNAME_POSTGRES_USERNAME,
        password:process.env.APPNAME_POSTGRES_PASSWORD,
        database: process.env.APPNAME_POSTGRES_DATABASE,
        host: process.env.APPNAME_POSTGRES_HOST
    }
}

// determine which environment was passed as a command-line argument
const currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

//chech that the current environment is one of the environments above, if not, default to staging
// export the module
export const config:environmentType = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;