import * as winston from 'winston';
class Logger {
  private loggerWinston: winston.Logger;
  constructor(){
   this.loggerWinston= winston.createLogger({
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
  info(path: string, method: string, controllerName: string, email: string){
    this.loggerWinston.info(`${path}, ${method}, ${controllerName}, ${email},${new Date()}`);
  }
  log(message: string, data?: any) {
    if(data){
      this.loggerWinston.info({ message, data, Date: new Date() });
    }else {
      this.loggerWinston.info(`${message}- ${new Date()}`);
    }
  }
  error (message: string, error?: any) {
    if (error) {
      this.loggerWinston.error({ message,error, Date: new Date() });
    } else {
      this.loggerWinston.error(`${message}- ${new Date()}`);
    }
  }
}
export const logger = new Logger();