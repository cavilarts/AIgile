// @ts-nocheck
import { createBoard, patchBoard } from "@/lib/db/board";
import { createColumns } from "@/lib/db/columns";
import { createProject, getProject, patchProject } from "@/lib/db/project";
import { createTasks } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // @TODO: temporary to test the API
  const { name, description, boardName, tasks } = await req.json();

  if (!name || !description || !boardName || !tasks) {
    return Response.json(
      { error: "Please provide all required fields" },
      { status: 400 }
    );
  }

  try {
    const slug = name.toLowerCase().replace(/ /g, "-");

    const project = await createProject({
      name,
      description,
      slug,
    });
    const projectId = "insertedId" in project ? project.insertedId : undefined;

    if (projectId === undefined) throw new Error("Project ID is undefined");

    const savedBoard = await createBoard({
      name: boardName,
      projectId,
    });

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
      listOfTasks.push(savedTasks.insertedIds[a]);
    }

    for (const b in savedColumns.insertedIds) {
      listOfColumns.push(savedColumns.insertedIds[b]);
    }

    await patchBoard(savedBoard.insertedId, {
      boardId: savedBoard.insertedId,
      projectId: project.insertedId,
      columns: listOfColumns,
      tasks: listOfTasks,
    });

    await patchProject(project.insertedId, {
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
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Please provide a project id" },
      { status: 400 }
    );
  }

  try {
    const project = await getProject(id);

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json(project);
  } catch (e) {
    console.error("getProject error", e);
    return Response.json(
      { error: "An error occurred", state: e },
      { status: 500 }
    );
  }
}
