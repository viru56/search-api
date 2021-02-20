import { TodoController } from "../controllers";

export class TodoRoutes {
  private todoController: TodoController = new TodoController();
  public routes(app: any): void {
    //get all todo
    app.route("/todo").get(this.todoController.getTodos)
    //add new todo
    .post(this.todoController.addNewTodo);
  }
}
