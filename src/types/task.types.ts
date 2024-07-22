import { ObjectId  } from "mongodb";

export type TaskId = ObjectId | string;

export type Task<T = ObjectId | string> = {
  _id?: T;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  // tags: string[];
  projectId: T;
  createdAt: Date;
  assignee?: string;
  subtasks?: T[];
  columnId: T;
};
