import { BoardApi, Task, TaskApi, TaskId } from "@/types"

export async function getBoard(url: string): Promise<BoardApi> {
  return fetch(url).then((res) => res.json());
}

export async function updateTaskInBoard(currentData: BoardApi | undefined, { taskId, sourceColumn, targetColumn }: { taskId: TaskId, sourceColumn: string, targetColumn: string }): Promise<BoardApi | undefined> {
  try {
    fetch(`/api/v1/task?id=${taskId}`, {
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

export async function deleteTaskInBoard(currentData: BoardApi | undefined, taskId: TaskId): Promise<BoardApi | undefined> {
  try {
    fetch(`/api/v1/task/?id=${taskId}`, {
      method: "DELETE",
    });
    // Filter out the task that was deleted
    currentData?.columns.forEach((column) => {
      column.tasks = column.tasks.filter((task) => task._id !== taskId);
    });

    return Promise.resolve(currentData);
  } catch (error) {
    console.error("Error deleting task:", error);
    return Promise.reject(error);
  }
}