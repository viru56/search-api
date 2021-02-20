"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const models_1 = require("./models");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.app = express();
        this.config();
        // to check your database connection
        // this.dbConnect();
        this.routes.routes(this.app);
    }
    config() {
        //support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //Secure HTTP headers returned by your Express apps.
        this.app.use(helmet());
        // limit repeated requests to public APIs and/or endpoints.
        this.configureRateLimiter();
    }
    configureRateLimiter() {
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
        });
        //  apply to all requests
        this.app.use(limiter);
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.db.sequelize.authenticate();
                console.log("Connection has been established successfully.");
                // if you want to drop all(if table exists) and create a new tables
                //  db.sequelize.sync({ force: true });
                // table sync
                // db.sequelize.sync();
            }
            catch (error) {
                console.error("Unable to connect to the database:", error);
            }
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map