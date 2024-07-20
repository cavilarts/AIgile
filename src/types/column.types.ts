import { Task } from "./task.types";

export type Column = {
  name: string;
  description: string;
  companyId: string;
  projectId: string;
  boardId: string;
  tasks: Task[];
};
