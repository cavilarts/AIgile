import { getBoards } from "@/lib/db/board";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.getAll("id");

  if (!id) {
    return Response.json(
      { error: "Please provide a board id" },
      { status: 400 }
    );
  }

  try {
    const boardId = parseInt(Array.isArray(id) ? id[0] : id, 10);
    const result = await getBoards(boardId);

    return Response.json(result);
  } catch (e) {
    console.error("getBoards error", e);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
