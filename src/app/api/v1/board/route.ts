import { createBoard, getBoard, getColumns, getTasks } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Please provide a board id" },
      { status: 400 }
    );
  }

  try {
    const board = await getBoard(id);
    const columns = await getColumns(id);
    const tasks = await getTasks(id);

    return Response.json({ ...board.data, columns, tasks });
  } catch (e) {
    console.error("getBoards error", e);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { name, description, companyId, projectId, createdBy, columns, tasks } =
    await req.json();
  const tempCreatedBy = {
    username: "John Doe",
    userId: "123456",
  };

  if (!name || !description || !companyId || !projectId) {
    return Response.json(
      { error: "Please provide all required fields" },
      { status: 400 }
    );
  }

  const data = {
    name,
    description,
    companyId,
    projectId,
    createdBy,
    columns: [],
    tasks: [],
  };

  try {
    const result = await createBoard(data);

    return Response.json(result);
  } catch (e) {
    console.error("createBoard error", e);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }

  return Response.json({ message: "Board created" });
}
