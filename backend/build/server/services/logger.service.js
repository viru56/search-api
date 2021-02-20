"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = require("winston");
class Logger {
    constructor() {
        this.loggerWinston = winston.createLogger({
            transports: [
                new winston.transports.File({
                    filename: 'info.log'
                })
            ]
        });
        if (process.env.NODE_ENV !== 'production') {
            this.loggerWinston.add(new winston.transports.Console({
                format: winston.format.simple()
            }));
        }
    }
    info(path, method, controllerName, email) {
        this.loggerWinston.info(`${path}, ${method}, ${controllerName}, ${email},${new Date()}`);
    }
    log(message, data) {
        if (data) {
            this.loggerWinston.info({ message, data, Date: new Date() });
        }
        else {
            this.loggerWinston.info(`${message}- ${new Date()}`);
        }
    }
    error(message, error) {
        if (error) {
            this.loggerWinston.error({ message, error, Date: new Date() });
        }
        else {
            this.loggerWinston.error(`${message}- ${new Date()}`);
        }
    }
}
exports.logger = new Logger();
//# sourceMappingURL=logger.service.js.map