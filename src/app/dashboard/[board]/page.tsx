"use client";

import useSWR from "swr";
import { KanbanBoard } from "@/components/KanbanBoard";
import { ColumnStatus, Task, TaskId } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProjectPage({ params }: { params: { board: string } }) {
  const { board } = params;

  const { data, isLoading, error } = useSWR(`/api/v1/project/${board}`, (url) =>
    fetch(url).then((res) => res.json())
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
            id: column._id,
            title: column.name,
            tasks: column.tasks,
          }))}
          tasks={{
            "task-1": {
              _id: "task-1",
              title: "Implement login functionality ",
              description:
                "Create a secure login system with email and password",
              createdAt: new Date("2024-07-10"),
              status: "to-do",
              assignee: "Alice",
              priority: "high",
              projectId: "project-1", // Add the projectId property
              columnId: "in-progress", // Add the columnId property
            },
            "task-2": {
              _id: "task-2",
              title: "Design landing page",
              description:
                "Create a visually appealing landing page for the website",
              createdAt: new Date("2024-07-11"),
              assignee: "Bob",
              status: "to-do",
              priority: "medium",
              projectId: "project-1", // Add the projectId property
              columnId: "in-progress", // Add the columnId property
            },
            "task-3": {
              _id: "task-3",
              title: "Optimize database queries",
              description:
                "Improve the performance of database queries for faster load times",
              createdAt: new Date("2024-07-12"),
              assignee: "Charlie",
              status: "in-progress",
              priority: "high",
              projectId: "project-1", // Add the projectId property
              columnId: "in-progress", // Add the columnId property
            },
            "task-4": {
              _id: "task-4",
              title: "Write unit tests",
              description:
                "Create comprehensive unit tests for the backend API",
              createdAt: new Date("2024-07-13"),
              assignee: "David",
              status: "in-progress",
              priority: "low",
              projectId: "project-1", // Add the projectId property
              columnId: "in-progress", // Add the columnId property
            },
            "task-5": {
              _id: "task-5",
              title: "Implement dark mode",
              description: "Add a dark mode option to improve user experience",
              createdAt: new Date("2024-07-14"),
              assignee: "Eve",
              status: "done",
              priority: "medium",
              projectId: "project-1", // Add the projectId property
              columnId: "in-progress", // Add the columnId property
            },
          }}
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
