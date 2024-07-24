"use client";

import useSWR, { mutate } from "swr";
import { KanbanBoard } from "@/components/KanbanBoard";
import { Column, ColumnStatus, Task, TaskId } from "@/types";
import { useSession } from "next-auth/react";
import { Collection } from "mongodb";

export default function ProjectPage({ params }: { params: { board: string } }) {
  const { board } = params;

  const { data, isLoading, error } = useSWR(`/api/v1/project/${board}`, (url) =>
    fetch(url).then((res) => res.json())
  );
  const { status } = useSession();
  // 

  console.log(data?.columns);

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
            _sourceColumn: string,
            targetColumn: string
          ): void {
            mutate(
              `/api/v1/project/${board}`,
              async (currentData) => {
                try {
                  const response = await fetch(`/api/v1/task/${taskId}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      columnId: targetColumn,
                    }),
                  });
          
                  if (!response.ok) {
                    throw new Error("Failed to update task");
                  }
          
                  const updatedTask = await response.json();
          
                  // Update the local data
                  const updatedColumns = currentData.columns.map((column: ColumnStatus) => {
                    if (column._id === targetColumn) {
                      return {
                        ...column,
                        tasks: [...column.tasks, updatedTask],
                      };
                    }
                    return {
                      ...column,
                      tasks: column.tasks.filter((task) => task._id !== taskId),
                    };
                  });
          
                  return { ...currentData, columns: updatedColumns };
                } catch (error) {
                  console.error("Error moving task:", error);
                  // Revert the optimistic update
                  return currentData;
                }
              },
              { revalidate: false }
            );
          }}
        />
      )}
    </>
  );
}
