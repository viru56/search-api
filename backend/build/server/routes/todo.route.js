"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = void 0;
const controllers_1 = require("../controllers");
class TodoRoutes {
    constructor() {
        this.todoController = new controllers_1.TodoController();
    }
    routes(app) {
        //get all todo
        app.route("/todo").get(this.todoController.getTodos)
            //add new todo
            .post(this.todoController.addNewTodo);
    }
}
exports.TodoRoutes = TodoRoutes;
//# sourceMappingURL=todo.route.js.map