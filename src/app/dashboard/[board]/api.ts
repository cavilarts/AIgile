import { TaskId } from "@/types"

type Board = {
  _id: string
  name: string
  description: string
  createdBy: string
  slug: string
  createdAt: string
  lastModifiedAt: string
  boardName: string
  tasks: string[]
  columns: Column[]
}

type Column = {
  _id: string
  name: string
  boardId: string
  projectId: string
  tasks: Task[]
}

export type Task = {
  _id: string
  title: string
  description: string
  priority: string
  tags: string[]
  projectId: string
  boardId: string
  columnId: string
  createdAt: string
  createdBy: string
}



export async function getBoard(url: string): Promise<Board> {
  return fetch(url).then((res) => res.json());
}

export async function updateTaskInBoard(currentData: Board | undefined, { taskId, sourceColumn, targetColumn }: { taskId: TaskId, sourceColumn: string, targetColumn: string }): Promise<Board | undefined> {
  try {
    fetch(`/api/v1/task/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        columnId: targetColumn,
      }),
    });
  } catch (error) {
    console.error("Error moving task:", error);
  } finally {
    return currentData;
  }
}