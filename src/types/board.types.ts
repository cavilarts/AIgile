import { ObjectId, OptionalId } from "mongodb";

export type BoardId = string | ObjectId;
export type ColumnId = string | ObjectId;
export type TaksId = string | ObjectId;

export type BoardApi = {
  _id: BoardId;
  name: string;
  description: string;
  createdBy: ObjectId | string;
  slug: string;
  createdAt: string;
  lastModifiedAt: Date;
  boardName: string;
  tasks: string[];
  columns: ColumnApi[];
  projectId: ObjectId | string;
};

export type BoardDB = {
  _id: BoardId;
  name: string;
  description: string;
  createdBy: ObjectId;
  slug: string;
  createdAt: string;
  lastModifiedAt: Date;
  boardName: string;
  tasks: ObjectId[];
  columns: ObjectId[];
  projectId: ObjectId;
};

export type ColumnApi = {
  _id: ColumnId;
  name: string;
  boardId: ObjectId | string;
  projectId: ObjectId | string;
  tasks: TaskApi[];
};

export type ColumnDB = {
  _id?: ColumnId;
  name: string;
  boardId: ObjectId;
  projectId: ObjectId;
  tasks: ObjectId[];
};

export type TaskApi = {
  _id: TaksId;
  title: string;
  description: string;
  // TODO: change to enum
  priority?: "low" | "medium" | "high";
  tags?: string[];
  assignee?: ObjectId | string;
  projectId: ObjectId | string;
  boardId: ObjectId | string;
  columnId: ObjectId | string;
  createdAt: Date;
  createdBy: ObjectId | string;
};

export type TaskDB = OptionalId<TaskApi>;
