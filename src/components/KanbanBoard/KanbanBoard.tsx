import { Column } from "./Column";

import { ColumnStatus, Task, TaskId } from "@/types";

export type KanbanBoardProps = {
  columns: ColumnStatus[];
  tasks: Record<TaskId, Task>;
  onTaskMove: (
    taskId: TaskId,
    sourceColumn: string,
    targetColumn: string,
  ) => void;
  onTaskEdit: (taskId: TaskId, updatedTask: Partial<Task>) => void;
  // TODO: Implement the onTaskCreate function and the create modal
  onTaskCreate: (task: Omit<Task, "id" | "createdAt">) => void;
  // TODO: Implement the onColumnCreate function and the create modal
  onColumnCreate: (column: Omit<ColumnStatus, "id" | "tasks">) => void;
  // TODO: Implement the onColumnEdit function and the edit modal
  onColumnEdit: (newOrder: string[]) => void;
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  tasks,
  onTaskMove,
  onTaskEdit,
  onTaskCreate,
  onColumnCreate,
  onColumnEdit,
}) => {
  return (
    <div className="h-full w-full">
      <div className="flex overflow-x-auto space-x-4 p-4 w-full bg-none m-auto">
        {columns.map((column, index) => {
          if (!column) return null;
          const columnTasks = column.tasks.map((taskId) => tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              index={index}
              tasks={columnTasks}
              onTaskEdit={onTaskEdit}
              onTaskMove={onTaskMove}
            />
          );
        })}
      </div>
    </div>
  );
};
