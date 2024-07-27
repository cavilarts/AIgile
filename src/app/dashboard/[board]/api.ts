import { BoardApi, TaskId } from "@/types"

export async function getBoard(url: string): Promise<BoardApi> {
  return fetch(url).then((res) => res.json());
}

export async function updateTaskInBoard(currentData: BoardApi | undefined, { taskId, sourceColumn, targetColumn }: { taskId: TaskId, sourceColumn: string, targetColumn: string }): Promise<BoardApi | undefined> {
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