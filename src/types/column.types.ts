import { ObjectId  } from "mongodb";

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

export type ColumnStatus = {
  id: string;
  title: string;
  tasks: string[];
};
