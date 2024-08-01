import { CreateEditForm } from "@/components/KanbanBoard/AddEditTaskForm";
import { FetchError } from "@/lib";
import { BoardApi, TaskId } from "@/types";

export async function getBoard(url: string): Promise<BoardApi> {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new FetchError('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function moveTaskInBoard(currentData: BoardApi | undefined, { taskId, sourceColumn, targetColumn }: { taskId: TaskId, sourceColumn: string, targetColumn: string }): Promise<BoardApi | undefined> {
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

export async function createTaskInBoard(currentData: BoardApi | undefined, tasks: CreateEditForm): Promise<BoardApi | undefined> {
  const { title, description, priority, tags, assignee, columnId, boardId, projectId } = tasks;
  console.log("createTaskInBoard", {
    currentData, title, description, priority, tags, assignee, boardId, columnId, projectId
  });
  console.log("tasks", tasks);
  try {
    fetch(`/api/v1/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        tags,
        assignee,
        columnId,
        boardId,
        projectId,
      }),
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return Promise.reject(error);
  } finally {
    return currentData;
  }
}

export async function updateTaskInBoard(currentData: BoardApi | undefined, tasks: CreateEditForm): Promise<BoardApi | undefined> {
  const { _id, title, description, priority, tags, assignee, columnId, boardId, projectId } = tasks;
  console.log("updateTaskInBoard", {
    currentData, title, description, priority, tags, assignee, boardId, columnId, projectId
  });
  console.log("tasks", tasks);
  try {
    fetch(`/api/v1/task?id=${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        title,
        description,
        priority,
        tags,
        assignee,
        columnId,
        boardId,
        projectId,
      }),
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return Promise.reject(error);
  } finally {
    return currentData;
  }
}