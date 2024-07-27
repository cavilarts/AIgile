import { Status } from "@/constants/status";
import {
  createBoard,
  createColumns,
  createProject,
  createTasks,
  getProject,
  getSessionUser,
  patchBoard,
  patchProject,
} from "@/lib/db";
import { TaskApi } from "@/types";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const requestBody = !!req.body && req.json();
  const { boardName, projectDescription, boardDescription, tasks } =
    await requestBody;

  try {
    const user = await getSessionUser();
    const slug = boardName.toLowerCase().replace(/ /g, "-");

    const project = await createProject({
      name: boardName,
      description: projectDescription,
      createdBy: user.data._id,
      slug,
    });
    const projectId = "insertedId" in project ? project.insertedId : undefined;
    if (projectId === undefined) throw new Error("Project ID is undefined");

    const savedBoard = await createBoard({
      name: boardName,
      projectId: projectId,
      // TODO: Update companyId and createdBy with actual values when authentication is implemented
      description: boardDescription,
      createdBy: user.data._id,
    });
    const boardId =
      "insertedId" in savedBoard ? String(savedBoard.insertedId) : undefined;
    if (boardId === undefined) throw new Error("Board ID is undefined");

    const savedColumns = await createColumns([
      {
        name: "To Do",
        boardId: new ObjectId(boardId),
        projectId,
      },
      {
        name: "In Progress",
        boardId: new ObjectId(boardId),
        projectId,
      },
      {
        name: "Done",
        boardId: new ObjectId(boardId),
        projectId,
      },
    ]);
    const columnIds =
      "insertedIds" in savedColumns ? savedColumns.insertedIds : undefined;
    if (columnIds === undefined) throw new Error("Column IDs are undefined");
    const columnId = "insertedIds" in savedColumns ? columnIds[0] : undefined;
    if (columnId === undefined) throw new Error("Column ID is undefined");

    console.log("savedColumns", columnId);

    const savedTasks = await createTasks([
      ...tasks.map((taskToSave: TaskApi) => ({
        ...taskToSave,
        projectId,
        boardId: new ObjectId(boardId),
        columnId,
        createdAt: new Date(),
        createdBy: user.data._id,
        status: Status.TODO,
      })),
    ]);
    const taskIds =
      "insertedIds" in savedTasks ? savedTasks.insertedIds : undefined;
    if (taskIds === undefined) throw new Error("Task IDs are undefined");

    const listOfTasks = [] as ObjectId[];
    const listOfColumns = [];

    for (const a in taskIds) {
      listOfTasks.push(taskIds[a] as ObjectId);
    }

    for (const b in columnIds) {
      listOfColumns.push(new ObjectId(columnIds[b]));
    }

    await patchBoard(boardId, {
      projectId: new ObjectId(projectId),
      columns: listOfColumns,
      tasks: listOfTasks,
      name: boardName,
      // TODO: Update companyId and createdBy with actual values when authentication is implemented
    });

    await patchProject(new ObjectId(projectId).toString(), {
      boardName: boardId,
      tasks: listOfTasks,
      // TODO: Update these properties with actual values when authentication is implemented
    });

    const savedProject = await getProject(projectId);

    return Response.json(savedProject);
  } catch (e) {
    console.error("createBoard error", e);
    return Response.json(
      { error: "An error occurred", state: e },
      { status: 500 }
    );
  }
}
