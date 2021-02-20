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
exports.TodoController = void 0;
const todo_model_1 = require("../models/todo.model");
const sequelize_1 = require("sequelize");
const services_1 = require("../services");
class TodoController {
    addNewTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services_1.logger.log('add new todo ', req.body);
            const todoParams = req.body;
            if (!todoParams.name) {
                return res.status(400).json({
                    message: 'Error in todo create',
                    errors: [
                        {
                            messsage: 'Name is required',
                            filed: 'name'
                        }
                    ]
                });
            }
            todoParams.name = todoParams.name.toLowerCase();
            try {
                const newTodo = yield todo_model_1.Todo.create(todoParams);
                res.status(201).json(newTodo);
            }
            catch (error) {
                services_1.logger.error('add new todo ', error);
                // filter the error and send back to client
                if ('errors' in error) {
                    const errors = error.errors.map(item => {
                        return {
                            message: item.message,
                            field: item.path
                        };
                    });
                    res.status(400).json({
                        message: 'Error in todo create',
                        errors
                    });
                }
                else {
                    res.status(400).json(error);
                }
            }
        });
    }
    getTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                services_1.logger.log('get todos ', req.query);
                let name = req.query.name;
                let limit = req.query.limit ? Number.parseInt(req.query.limit.toString()) : 10;
                let offset = req.query.page ? Number.parseInt(req.query.page.toString()) * limit : 0;
                let query = {
                    attributes: ['id', 'name'],
                    where: {},
                    limit,
                    offset
                };
                if (name) {
                    query.where = {
                        // find all records where name starts with search value 
                        name: {
                            [sequelize_1.Op.startsWith]: name
                        }
                        // find all records where search key is a subString of name
                        // name : {
                        //   [Op.like] : `%${name}%`
                        // }
                    };
                }
                const todos = yield todo_model_1.Todo.findAndCountAll(query);
                res.status(200).json(todos);
            }
            catch (error) {
                services_1.logger.error('get todo ', error);
                res.status(400).json(error);
            }
        });
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map