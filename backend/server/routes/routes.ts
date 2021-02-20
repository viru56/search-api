import { Request, Response } from "express";
import { TodoRoutes } from "./todo.route";
import * as packageJson from "../../package.json";
import * as path from "path";
export class Routes {
  private todoRoutes: TodoRoutes = new TodoRoutes();
  public routes(app: any): void {
    app.route("/").get((req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../../", "client", "index.html"));
    });
    // check your app version
    app.route("/version").get((req: Request, res: Response) => {
      res.status(200).json({
        version: packageJson.version,
      });
    });
    // todo routes
    app.route("/todo", this.todoRoutes.routes(app));
  }
}
