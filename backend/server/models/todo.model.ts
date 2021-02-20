import {Model, DataTypes } from "sequelize";
import { db } from "./";
export interface ITodo {
    name: string;
  }
export class Todo extends Model implements ITodo {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Todo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        primaryKey: true
      },
    },
    {
      tableName: "todos",
      sequelize: db.sequelize,
    }
  );
  // if you want to drop (if table exists) and create a new table 
  // Todo.sync({ force: true }).then(() => console.log("Todo table created"));
  // table sync
  // Todo.sync().then(() => console.log("Todo table sync"));