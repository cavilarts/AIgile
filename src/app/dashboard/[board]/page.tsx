"use client";

import { KanbanBoard } from "@/components/KanbanBoard";
import { ToastContainer, toast } from 'react-toastify';
import { onTaskCreateParams } from "@/components/KanbanBoard/AddEditTaskForm";
import { ColumnApi, TaskApi, TaskId } from "@/types";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { deleteTaskInBoard, getBoard, updateTaskInBoard } from "./api";
import { cloneDeep } from "lodash";

export default function ProjectPage({ params }: { params: { board: string } }) {
  const { board } = params;
  const notifyDelete = () => toast("Task deleted successfully", { type: "success" });
  const notifyError = () => toast("An error occurred", { type: "error" });
  const { data, isLoading, mutate, error } = useSWR(`/api/v1/project/${board}`, getBoard);
  const { status } = useSession();

  const onTaskDelete = function (taskId: TaskId): void {
    mutate((currentData) => deleteTaskInBoard(currentData, taskId), {
      rollbackOnError: false,
      populateCache: false,
      revalidate: true
    }).then(notifyDelete).catch((error) => {
      console.error("Error deleting task:", error);
      notifyError();
    });
  };

  return (
    <>
      {status !== "authenticated" && isLoading && <div>Loading...</div>}
      {status === "authenticated" && data && (
        <KanbanBoard
          columns={data.columns.map((column) => ({
            ...column,
            _id: column._id,
            title: column.name,
            tasks: column.tasks,
          }))}
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
          onTaskCreate={function (task: onTaskCreateParams): void {
            // TODO: implement here the call to the API to create a new task, but first we need to create the create modal
            return console.error("Function not implemented.");
          }}
          onTaskDelete={onTaskDelete}
          onTaskEdit={function (
            taskId: TaskId,
            updatedTask: Partial<TaskApi>
          ): void {
            // TODO: implement here the call to the API to update the task, but first we need to create the edit modal
            console.error("Function not implemented.");
          }}
          onTaskMove={function (
            taskId: TaskId,
            sourceColumn: string,
            targetColumn: string
          ): void {
            const optimisticData = cloneDeep(data);
            let extractedTask: TaskApi;

            optimisticData.columns = optimisticData.columns.map((column) => {
              if (column._id == sourceColumn) {
                const columnWithoutMovedTask = column.tasks.filter((task: TaskApi) => {
                  if (task._id == taskId) {
                    extractedTask = task;
                  }

                  return task._id !== taskId
                });

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


            mutate((currentData) => updateTaskInBoard(currentData, { taskId, sourceColumn, targetColumn }), {
              optimisticData: optimisticData,
              rollbackOnError: false,
              populateCache: false,
              revalidate: true
            });
          }}
        />
      )}
      <ToastContainer />
    </>
  );
}
