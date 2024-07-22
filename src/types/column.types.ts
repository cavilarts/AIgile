import { ObjectId, OptionalId } from "mongodb";

export type ColumnId = string;

export type Column = {
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
