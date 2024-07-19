export type TaskId = string;

export type Task = {
  id: TaskId;
  title: string;
  description: string;
  createdAt: Date;
  assignee?: string;
  priority: "low" | "medium" | "high";
  subtasks?: TaskId[];
  status: string;
};

export type ColumnStatus = {
  id: string;
  title: string;
  tasks: TaskId[];
};
