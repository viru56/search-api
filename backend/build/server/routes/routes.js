"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const _1 = require("./");
const packageJson = require("../../package.json");
class Routes {
    constructor() {
        this.todoRoutes = new _1.TodoRoutes();
    }
    routes(app) {
        app.route("/").get((req, res) => {
            res.status(200).json({
                message: "Welcome to node-typescript",
            });
        });
        // check your app version
        app.route("/version").get((req, res) => {
            res.status(200).json({
                version: packageJson.version,
            });
        });
        // todo routes
        app.route("/todo", this.todoRoutes.routes(app));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map