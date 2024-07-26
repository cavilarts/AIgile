import { ObjectId } from "mongodb";

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
