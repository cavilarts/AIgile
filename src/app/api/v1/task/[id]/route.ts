import { patchTask } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.href.split("/").pop();
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
