import { getTask } from "@/lib/db/taks";
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
