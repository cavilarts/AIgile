import { Task, TaskId } from "./task.types";

export type Column = {
  name: string;
  description: string;
  companyId: string;
  projectId: string;
  boardId: string;
  tasks: Task[];
};

export type ColumnStatus = {
  id: string;
  title: string;
  tasks: TaskId[];
};
