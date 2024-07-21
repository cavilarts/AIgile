import { Column } from "./column.types";
import { TaskId } from "./task.types";

export type Board = {
  name: string;
  description: string;
  companyId: string;
  projectId: string;
  createdBy: string;
  columns: Column[];
  tasks: TaskId[];
};
