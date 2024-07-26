import { ObjectId  } from "mongodb";
import { Task } from "./task.types";

export type ColumnId = ObjectId | string;

export type Column = {
  _id: ColumnId;
  name: string;
  description: string;
  companyId: string;
  projectId: ObjectId;
  boardId: string;
  tasks: ObjectId[];
};

export type ColumnStatus = Omit<Column, "tasks"> & {
  tasks: Task[];
};
