import { Task } from "./task.types";

export type Project = {
  _id?: string;
  name: string;
  description: string;
  slug: string;
  boardName: string;
  tasks: Task[];
};
