"use client";

import { KanbanBoard } from "@/components/KanbanBoard";
import { Task, ColumnStatus, TaskId } from "@/types";
import { ObjectId } from "mongodb";

// TODO: implement the API calls to create, edit, and move tasks and columns
export default function BoardPage() {
  return (
    <KanbanBoard
      columns={[
        {
          id: "to-do",
          title: "To Do",
          tasks: ["task-1", "task-2"],
        },
        {
          id: "in-progress",
          title: "In Progress",
          tasks: ["task-3", "task-4"],
        },
        {
          id: "done",
          title: "Done",
          tasks: ["task-5"],
        },
      ]}
      tasks={{
        "task-1": {
          _id: "task-1",
          title: "Implement login functionality ",
          projectId: "project-1",
          description: "Create a secure login system with email and password",
          createdAt: new Date("2024-07-10"),
          columnId: "to-do",
          assignee: "Alice",
          priority: "high",
        },
        "task-2": {
          _id: "task-2",
          title: "Design landing page",
          projectId: "project-1",
          description:
            "Create a visually appealing landing page for the website",
          createdAt: new Date("2024-07-11"),
          assignee: "Bob",
          columnId: "to-do",
          priority: "medium",
        },
        "task-3": {
          _id: "task-3",
          title: "Optimize database queries",
          projectId: "project-1",
          description:
            "Improve the performance of database queries for faster load times",
          createdAt: new Date("2024-07-12"),
          assignee: "Charlie",
          columnId: "in-progress",
          priority: "high",
        },
        "task-4": {
          _id: "task-4",
          title: "Write unit tests",
          projectId: "project-1",
          description: "Create comprehensive unit tests for the backend API",
          createdAt: new Date("2024-07-13"),
          assignee: "David",
          columnId: "in-progress",
          priority: "low",
        },
        "task-5": {
          _id: "task-5",
          title: "Implement dark mode",
          projectId: "project-1",
          description: "Add a dark mode option to improve user experience",
          createdAt: new Date("2024-07-14"),
          assignee: "Eve",
          columnId: "done",
          priority: "medium",
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
      onTaskCreate={function (task: Omit<Task, "id" | "createdAt" | "projectId">): void {
        // TODO: implement here the call to the API to create a new task, but first we need to create the create modal
        console.error("Function not implemented.");
      }}
      onTaskEdit={function (taskId: TaskId, updatedTask: Partial<Task>): void {
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
  );
}
