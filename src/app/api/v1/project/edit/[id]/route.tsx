import { patchProject } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.href.split("/").pop();
  const { data } = await req.json();

  if (!id) {
    return Response.json(
      { error: "Please provide a project id" },
      { status: 400 }
    );
  }

  try {
    const updatedProject = await patchProject(id, data);

    return Response.json(updatedProject);
  } catch (error) {
    console.error("patchProject error", error);
    return Response.json(
      { error: "An error occurred", state: error },
      { status: 500 }
    );
  }
}
