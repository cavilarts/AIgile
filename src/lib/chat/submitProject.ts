import { Project } from "@/types/project.types";
import { createProject, getProject, updateProject } from "../db/project";
import { createBoard, updateBoard } from "../db/board";
import { createColumns } from "../db/columns";
import { createTasks } from "../db/taks";

export const submitProject = async (project: Project) => {
  const { name, description, boardName, tasks } = project;

  try {
    const slug = name.toLowerCase().replace(/ /g, "-");

    const project = await createProject({
      name,
      description,
      slug,
    });

    console.log("savedBoard", project.insertedId);

    const savedBoard = await createBoard({
      name: boardName,
      projectId: project.insertedId,
    });

    console.log("savedBoard", savedBoard.insertedId);

    const savedColumns = await createColumns([
      {
        name: "To Do",
        boardId: savedBoard.insertedId,
        projectId: project.insertedId,
      },
      {
        name: "In Progress",
        boardId: savedBoard.insertedId,
        projectId: project.insertedId,
      },
      {
        name: "Done",
        boardId: savedBoard.insertedId,
        projectId: project.insertedId,
      },
    ]);

    console.log("savedColumns", savedColumns);

    const savedTasks = await createTasks([
      ...tasks.map((taskToSave) => ({
        ...taskToSave,
        projectId: project.insertedId,
        boardId: savedBoard.insertedId,
        columnId: savedColumns.insertedIds[0],
      })),
    ]);

    const listOfTasks = [];
    const listOfColumns = [];

    for (const a in savedTasks.insertedIds) {
      console.log("task", a);
      listOfTasks.push(savedTasks.insertedIds[a]);
    }

    for (const b in savedColumns.insertedIds) {
      listOfColumns.push(savedColumns.insertedIds[b]);
    }

    await updateBoard(savedBoard.insertedId, {
      boardId: savedBoard.insertedId,
      projectId: project.insertedId,
      columns: listOfColumns,
      tasks: listOfTasks,
    });

    await updateProject(project.insertedId, {
      boardId: savedBoard.insertedId,
      projectId: project.insertedId,
      columns: listOfColumns,
      tasks: listOfTasks,
    });

    const savedProject = await getProject(project.insertedId);

    return Response.json(savedProject);
  } catch (e) {
    console.error("createBoard error", e);
    return Response.json(
      { error: "An error occurred", state: e },
      { status: 500 }
    );
  }
};
