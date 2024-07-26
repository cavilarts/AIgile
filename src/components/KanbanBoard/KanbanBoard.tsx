import { Column } from "./Column";
import { AddEditTaskForm } from "./AddEditTaskForm";
import { ColumnStatus, Task, TaskId } from "@/types";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

export type KanbanBoardProps = {
  columns: ColumnStatus[];
  onTaskMove: (
    taskId: TaskId,
    sourceColumn: string,
    targetColumn: string
  ) => void;
  onTaskEdit: (taskId: TaskId, updatedTask: Partial<Task>) => void;
  // TODO: Implement the onTaskCreate function and the create modal
  onTaskCreate: (task: Omit<Task, "id" | "createdAt" | "projectId">) => void;
  // TODO: Implement the onColumnCreate function and the create modal
  onColumnCreate: (column: Omit<ColumnStatus, "id" | "tasks">) => void;
  // TODO: Implement the onColumnEdit function and the edit modal
  onColumnEdit: (newOrder: string[]) => void;
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  onTaskMove,
  onTaskEdit,
  onTaskCreate,
  onColumnCreate,
  onColumnEdit,
}) => {
  return (
    <div>
      <Navbar>
        <NavbarContent justify="end">
          <NavbarItem>
            <AddEditTaskForm columns={columns} onTaskCreate={onTaskCreate} />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="h-full w-full">
        <div className="flex overflow-x-auto space-x-4 space-y-4 p-4 w-full bg-none m-auto flex-no-wrap">
          {columns.map((column, index) => {
            if (!column) return null;

            return (
              <Column
                key={String(column.id)}
                column={column}
                index={index}
                tasks={column.tasks}
                onTaskEdit={onTaskEdit}
                onTaskMove={onTaskMove}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
