import { ProjectGenerated } from "@/types/project.types";
import { createBoard, updateBoard } from "../../lib/db/board";
import { createProject, getProject, updateProject } from "../../lib/db/project";
import { createTasks, createColumns } from "../../lib/db";
import { ObjectId } from "mongodb";

export const submitProject = async (project: ProjectGenerated) => {
  const { boardName, projectDescription,  tasks } = project;

  try {
    const slug = boardName.toLowerCase().replace(/ /g, "-");

    const project = await createProject({
      name: boardName,
      description: projectDescription,
      slug,
    });
    const projectId = "insertedId" in project ? project.insertedId : undefined;
    if(projectId === undefined) throw new Error("Project ID is undefined");

    const savedBoard = await createBoard({
      name: boardName,
      projectId,
      // TODO: Update companyId and createdBy with actual values when authentication is implemented
      description: "",
      companyId: "",
      createdBy: "",
    });
    const boardId = "insertedId" in savedBoard ? String(savedBoard.insertedId) : undefined;
    if(boardId === undefined) throw new Error("Board ID is undefined");

    const savedColumns = await createColumns([
      {
        name: "To Do",
        boardId,
        projectId,
      },
      {
        name: "In Progress",
        boardId,
        projectId,
      },
      {
        name: "Done",
        boardId,
        projectId
      },
    ]);
    const columnIds = "insertedIds" in savedColumns ? savedColumns.insertedIds : undefined;
    if(columnIds === undefined) throw new Error("Column IDs are undefined");
    const columnId = "insertedIds" in savedColumns ? columnIds[0] : undefined;
    if(columnId === undefined) throw new Error("Column ID is undefined");

    console.log("savedColumns", savedColumns);

    const savedTasks = await createTasks([
      ...tasks.map((taskToSave) => ({
        ...taskToSave,
        projectId,
        boardId,
        columnId,
        createdAt: new Date(),
      })),
    ]);
    const taskIds = "insertedIds" in savedTasks ? savedTasks.insertedIds : undefined;
    if(taskIds === undefined) throw new Error("Task IDs are undefined");

    const listOfTasks = [] as ObjectId[];
    const listOfColumns = [];

    for (const a in taskIds) {
      listOfTasks.push(taskIds[a] as ObjectId);
    }

    for (const b in columnIds) {
      listOfColumns.push(columnIds[b]);
    }

    await updateBoard(boardId, {
      projectId,
      columns: listOfColumns,
      tasks: listOfTasks,
      name: boardName,
      // TODO: Update companyId and createdBy with actual values when authentication is implemented
      description: "",
      companyId: "",
      createdBy: "",
    });

    await updateProject(projectId, {
      boardName: boardId,
      tasks: listOfTasks,
      // TODO: Update these properties with actual values when authentication is implemented
      name: "",
      description: "",
      slug: ""
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
};
