"use client";

import useSWR from "swr";
import { KanbanBoard } from "@/components/KanbanBoard";
import { BoardApi, ColumnStatus, TaskApi, TaskId } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { onTaskCreateParams } from "@/components/KanbanBoard/AddEditTaskForm";

export default function ProjectPage({ params }: { params: { board: string } }) {
  const { board } = params;

  const { data, isLoading, error } = useSWR(
    `/api/v1/project/${board}`,
    (url): Promise<BoardApi> => fetch(url).then((res) => res.json())
  );
  const { status } = useSession();
  const router = useRouter();

  console.log(data?.columns);

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
            column: Omit<ColumnStatus, "id" | "tasks">
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
            // TODO: implement here the call to the API to update the task's column
            console.log("Task moved:", {
              taskId,
              sourceColumn,
              targetColumn,
            });
          }}
        />
      )}
    </>
  );
}
