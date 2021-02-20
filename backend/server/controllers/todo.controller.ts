import { Request, Response } from "express";
import { Todo, ITodo } from "../models/todo.model";
import {Op} from 'sequelize';
import {logger} from '../services';
export class TodoController {
  public async addNewTodo(req: Request, res: Response) {
    logger.log('add new todo ',req.body);
    const todoParams: ITodo = req.body;
    if(!todoParams.name){
      return res.status(400).json({
        message:'Error in todo create',
        errors:[
          {
            messsage: 'Name is required',
            filed: 'name'
          }
        ]
      })
    }
    todoParams.name = todoParams.name.toLowerCase();
    try {
      const newTodo = await Todo.create<Todo>(todoParams);
      res.status(201).json(newTodo);
    } catch (error) {
      logger.error('add new todo ',error);
        // filter the error and send back to client
        if('errors' in error){
            const errors = error.errors.map(item=>{
                return {
                    message: item.message,
                    field: item.path
                }
            })
            res.status(400).json({
                message:'Error in todo create',
                errors
            });
        }else{
            res.status(400).json(error);
        }
    }
  }
  public async getTodos(req: Request, res: Response) {
    try {
      logger.log('get todos ',req.query);
      let name = req.query.name ? req.query.name.toString().toLowerCase() : "";
      let limit = req.query.limit ?  Number.parseInt(req.query.limit.toString()) : 10;
      let offset = req.query.page ? Number.parseInt(req.query.page.toString()) * limit: 0;

        let query = {
          attributes:['id','name'],
          where:{},
          limit,
          offset
        }
        if(name){
          query.where = {
            // find all records where search key is a subString of name
            name : {
              [Op.like] : `%${name}%`
            }
          }
        }
        const todos = await Todo.findAndCountAll<Todo>(query);
        res.status(200).json(todos);
    } catch (error) {
      logger.error('get todo ',error);
      res.status(400).json(error);
    }
  }
}
