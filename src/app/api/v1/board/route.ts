import { getBoards } from "@/lib/db/board";
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
    const result = await getBoards(id);

    return Response.json(result);
  } catch (e) {
    console.error("getBoards error", e);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { name, tasks } = await req.json();

  console.log(name, tasks);

  return Response.json({ message: "Board created" });
}
