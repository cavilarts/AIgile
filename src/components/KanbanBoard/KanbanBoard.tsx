import { DashboardLayout} from "@/layouts";
import { ColumnApi, TaskApi, TaskId } from "@/types";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { AddEditTaskForm, onTaskCreateParams } from "./AddEditTaskForm";
import { Column } from "./Column";

export type KanbanBoardProps = {
  columns: ColumnApi[];
  onTaskMove: (
    taskId: TaskId,
    sourceColumn: string,
    targetColumn: string
  ) => void;
  onTaskEdit: (taskId: TaskId, updatedTask: Partial<TaskApi>) => void;
  // TODO: Implement the onTaskCreate function and the create modal
  onTaskCreate: (task: onTaskCreateParams) => void;
  // TODO: Implement the onColumnCreate function and the create modal
  onColumnCreate: (column: Omit<ColumnApi, "id" | "tasks">) => void;
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
    <DashboardLayout>
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
                className="flex-1"
                key={String(column._id)}
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
    </DashboardLayout>
  );
};
