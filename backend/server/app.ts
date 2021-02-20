import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import { db } from "./models";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import * as path from 'path';
class App {
  public app: express.Application;
  private routes: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
    // to check your database connection
    // this.dbConnect();
    this.routes.routes(this.app);
  }
  private config(): void {
    //support application/json type post data
    this.app.use(bodyParser.json());

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    //Secure HTTP headers returned by your Express apps.
    this.app.use(helmet());
    
    // limit repeated requests to public APIs and/or endpoints.
    this.configureRateLimiter();
    // support for html
    const options = {
      dotfiles: "ignore",
      etag: false,
      extensions: ["htm", "html", "css", "png", "jpg"],
      index: false,
      maxAge: "1d",
      redirect: false,
      setHeaders: function(res) {
        res.set("x-timestamp", Date.now());
      }
    };
    // for css files
    this.app.use(express.static(path.join(__dirname, "../client"), options));
  }
  private configureRateLimiter(): void {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    });
    //  apply to all requests
    this.app.use(limiter);
  }
  private async dbConnect(): Promise<void> {
    try {
      await db.sequelize.authenticate();
      console.log("Connection has been established successfully.");
       // if you want to drop all(if table exists) and create a new tables
     //  db.sequelize.sync({ force: true });
      // table sync
      // db.sequelize.sync();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default new App().app;
