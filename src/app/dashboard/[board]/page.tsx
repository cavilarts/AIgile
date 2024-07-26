"use client";

import useSWR, { useSWRConfig } from "swr";
import { KanbanBoard } from "@/components/KanbanBoard";
import { Column, ColumnStatus, TaskId } from "@/types";
import { useSession } from "next-auth/react";
import { Collection } from "mongodb";
import { getBoard, updateTaskInBoard, Task } from "./api";
import { cloneDeep } from "lodash";

export default function ProjectPage({ params }: { params: { board: string } }) {
  const { board } = params;
  const { data, isLoading, mutate } = useSWR(`/api/v1/project/${board}`, getBoard);
  const { status, data: sessionData } = useSession();
  
  console.log('data', data);

  return (
    <>
      {status !== "authenticated" && isLoading && <div>Loading...</div>}
      {status === "authenticated" && data && (
        <KanbanBoard
          columns={data.columns.map((column) => ({
            id: column._id,
            title: column.name,
            tasks: column.tasks,
          }))}
          onColumnCreate={function (
            column: Omit<ColumnStatus, "id" | "tasks">
          ): void {
            // TODO: implement here the call to the API to create a new column
            console.error("Function not implemented.");
          }}
          onColumnEdit={function (newOrder: string[]): void {
            // TODO: implement here the call to the API to update the column
            console.error("Function not implemented.");
          }}
          onTaskCreate={function (task: Omit<Task, "id" | "createdAt">): void {
            // TODO: implement here the call to the API to create a new task, but first we need to create the create modal
            console.error("Function not implemented.");
          }}
          onTaskEdit={function (
            taskId: TaskId,
            updatedTask: Partial<Task>
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
            let extractedTask: Task;

            optimisticData.columns = optimisticData.columns.map((column) => {
              if (column._id == sourceColumn) {
                const columnWithoutMovedTask = column.tasks.filter((task: Task) => {
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
    </>
  );
}
