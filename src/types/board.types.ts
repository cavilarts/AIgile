import { TaskId } from "./task.types";

export type ColumnStatus = {
  id: string;
  title: string;
  tasks: TaskId[];
};
