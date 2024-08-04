import { DashboardLayout } from "@/layouts";
import { ColumnApi, TaskId } from "@/types";
import { Button, Navbar, NavbarContent, NavbarItem, useDisclosure } from "@nextui-org/react";
import { AddEditTaskForm, CreateEditForm, TaskAction } from "./AddEditTaskForm";
import { Column } from "./Column";

export type KanbanBoardProps = {
  columns: ColumnApi[];
  onTaskMove: (
    taskId: TaskId,
    sourceColumn: string,
    targetColumn: string
  ) => void;
  onTaskEdit: (task: CreateEditForm) => void;
  onTaskDelete: (taskId: TaskId) => void;
  onTaskCreate: (task: CreateEditForm) => void;
  // TODO: Implement the onColumnCreate function and the create modal
  onColumnCreate: (column: Omit<ColumnApi, "id" | "tasks">) => void;
  // TODO: Implement the onColumnEdit function and the edit modal
  onColumnEdit: (newOrder: string[]) => void;
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  onTaskMove,
  onTaskEdit,
  onTaskDelete,
  onTaskCreate,
  onColumnCreate,
  onColumnEdit,
}) => {
  const modalDisclosure = useDisclosure();

  return (
    <DashboardLayout menuContent={[
      <NavbarContent justify="end" key='navbar-content'>
        <NavbarItem>
          <Button color="primary" onPress={modalDisclosure.onOpen}>
            Add New Task
          </Button>
          <AddEditTaskForm columns={columns} onSubmit={onTaskCreate} mode={TaskAction.ADD} modalDisclosure={modalDisclosure} />
        </NavbarItem>
      </NavbarContent>
    ]}>

      <div className="h-full w-full">
        <div className="flex overflow-x-auto space-x-4  p-4 w-full bg-none m-auto flex-no-wrap">
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
                onTaskDelete={onTaskDelete}
              />
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};
