"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = require("http");
const config_1 = require("./config/config");
const services_1 = require("./services");
const init = () => {
    http.createServer(app_1.default).listen(config_1.config.httpPort, () => {
        services_1.logger.log('The HTTP server is running on port ' + config_1.config.httpPort + ' - ' + config_1.config.envName);
    });
};
init();
//# sourceMappingURL=server.js.map