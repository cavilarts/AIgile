import { createTask, deleteTask, getTask, patchTask, updateTask } from "@/lib/db/tasks";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Please provide a task id" },
      { status: 400 }
    );
  }

  try {
    const result = await getTask(id);

    return Response.json(result);
  } catch (e) {
    console.error("getTask error", e);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const requestBody = !!req.body && req.json();

  if (requestBody === null) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const {
    title,
    description,
    priority,
    tags,
    projectId,
    boardId,
    columnId,
    createdBy,
  } = await requestBody;

  if (
    !title ||
    !description ||
    !priority ||
    !tags ||
    !projectId ||
    !boardId ||
    !columnId
  ) {
    return Response.json(
      { error: "Please provide all required fields" },
      { status: 400 }
    );
  }

  try {
    const result = await createTask({
      title,
      description,
      priority,
      tags,
      projectId,
      boardId,
      columnId,
      createdAt: new Date(),
      createdBy,
    });

    return Response.json(result);
  } catch (e) {
    console.error("createTasks error", e);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const requestBody = !!req.body && req.json();

  if (requestBody === null) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { id, title, description, priority, tags, status, assignee, columnId } =
    await requestBody;

  if (!id) {
    return Response.json(
      { error: "Please provide a task id" },
      { status: 400 }
    );
  }

  try {
    const result = await updateTask(id, {
      title,
      description,
      priority,
      tags,
      assignee,
      createdAt: new Date(),
      columnId,
      createdBy: "",
    });

    return Response.json(result);
  } catch (e) {
    console.error("updateTask error", e);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const data = await req.json();

  if (!id) {
    return Response.json(
      { error: "Please provide a task id" },
      { status: 400 }
    );
  }

  try {
    const result = await patchTask(id, data);

    return Response.json(result);
  } catch (e) {
    console.error("updateTask error", e);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Please provide a task id" },
      { status: 400 }
    );
  }

  try {
    const result = await deleteTask(id);

    return Response.json(result);
  } catch (e) {
    console.error("deleteTask error", e);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
