import { ObjectId } from "mongodb";

export type BoardId = string;

export type Board = {
  name: string;
  description: string;
  companyId: string;
  projectId: ObjectId;
  createdBy: string;
  columns: ObjectId[];
  tasks: ObjectId[];
};
