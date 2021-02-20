"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const sequelize_1 = require("sequelize");
const _1 = require("./");
class Todo extends sequelize_1.Model {
}
exports.Todo = Todo;
Todo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
}, {
    tableName: "todos",
    sequelize: _1.db.sequelize,
});
// if you want to drop (if table exists) and create a new table 
// Todo.sync({ force: true }).then(() => console.log("Todo table created"));
// table sync
// Todo.sync().then(() => console.log("Todo table sync"));
//# sourceMappingURL=todo.model.js.map