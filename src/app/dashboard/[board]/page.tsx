"use client";

import { KanbanBoard } from "@/components/KanbanBoard";
import { ToastContainer, toast } from "react-toastify";
import { CreateEditForm as EditCreateFormData } from "@/components/KanbanBoard/AddEditTaskForm";
import { ColumnApi, TaskApi, TaskId } from "@/types";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import {
  createTaskInBoard,
  deleteTaskInBoard,
  getBoard,
  moveTaskInBoard,
  updateTaskInBoard,
} from "./api";
import { cloneDeep } from "lodash";
const Custom404 = lazy(() => import("@/components/ErrorStatus/Custom404"));
const Custom500 = lazy(() => import("@/components/ErrorStatus/Custom500"));
import { lazy, Suspense } from "react";

export default function ProjectPage({ params }: { params: { board: string } }) {
  const { board } = params;
  const notifyDelete = () => toast("Task deleted successfully", { type: "success" });
  const notifyCreate = () => toast("Task created successfully", { type: "success" });
  const notifyEdit = () => toast("Task edited successfully", { type: "success" });
  const notifyError = () => toast("An error occurred", { type: "error" });
  const { data, isLoading, mutate, error } = useSWR(
    `/api/v1/project/${board}`,
    getBoard
  );
  const { status } = useSession();

  const onTaskDelete = (taskId: TaskId): void => {
    mutate((currentData) => deleteTaskInBoard(currentData, taskId), {
      rollbackOnError: false,
      populateCache: false,
      revalidate: true,
    })
      .then(notifyDelete)
      .catch((error) => {
        console.error("Error deleting task:", error);
        notifyError();
      });
  };

  const onTaskCreate = (task: EditCreateFormData): void => {
    mutate((currentData) => createTaskInBoard(currentData, task), {
      rollbackOnError: false,
      populateCache: false,
      revalidate: true,
    })
      .then(() => {
        notifyEdit();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        notifyError();
      });
  };

  const onTaskEdit = (task: EditCreateFormData): void => {
    mutate((currentData) => updateTaskInBoard(currentData, task), {
      rollbackOnError: false,
      populateCache: false,
      revalidate: true,
    })
      .then(() => {
        notifyCreate();
      })
      .catch((error) => {
        console.error("Error editing task:", error);
        notifyError();
      });
  }

  return (
    <>
      {status !== "authenticated" && isLoading && <div>Loading...</div>}
      {error && error?.status === 404 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Custom404 />
        </Suspense>
      )}
      {status === "authenticated" && error && error?.status === 500 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Custom500 />
        </Suspense>
      )}
      {status === "authenticated" && data && (
        <KanbanBoard
          columns={data?.columns?.map((column) => ({
            ...column,
            _id: column._id,
            title: column.name,
            tasks: column.tasks,
          }))}
          boardName={data?.boardName}
          projectName={data?.name}
          onColumnCreate={function (
            column: Omit<ColumnApi, "id" | "tasks">
          ): void {
            // TODO: implement here the call to the API to create a new column
            console.error("Function not implemented.");
          }}
          onColumnEdit={function (newOrder: string[]): void {
            // TODO: implement here the call to the API to update the column
            console.error("Function not implemented.");
          }}
          onTaskCreate={onTaskCreate}
          onTaskDelete={onTaskDelete}
          onTaskEdit={onTaskEdit}
          onTaskMove={function (
            taskId: TaskId,
            sourceColumn: string,
            targetColumn: string
          ): void {
            const optimisticData = cloneDeep(data);
            let extractedTask: TaskApi;

            optimisticData.columns = optimisticData.columns.map((column) => {
              if (column._id == sourceColumn) {
                const columnWithoutMovedTask = column.tasks.filter(
                  (task: TaskApi) => {
                    if (task._id == taskId) {
                      extractedTask = task;
                    }

                    return task._id !== taskId;
                  }
                );

                return { ...column, tasks: columnWithoutMovedTask };
              } else {
                return column;
              }
            });

            optimisticData.columns = optimisticData.columns.map((column) => {
              if (column._id == targetColumn) {
                column.tasks.push(extractedTask);
              }
              return column;
            });

            mutate(
              (currentData) =>
                moveTaskInBoard(currentData, {
                  taskId,
                  sourceColumn,
                  targetColumn,
                }),
              {
                optimisticData: optimisticData,
                rollbackOnError: false,
                populateCache: false,
                revalidate: true,
              }
            );
          }}
        />
      )}
      <ToastContainer />
    </>
  );
}
