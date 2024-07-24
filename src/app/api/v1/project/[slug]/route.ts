import {
  getColumnsByProjectId,
  getProjectBySlug,
  getTask,
  getTasksByColumnId,
} from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.href.split("/").pop();

  if (!slug) {
    return Response.json(
      { error: "Please provide a project slug" },
      { status: 400 }
    );
  }

  try {
    const project = await getProjectBySlug(slug);
    const columns = await getColumnsByProjectId(project._id);

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    const columnsWithTasks = await Promise.all(
      columns.map(async (column) => {
        const tasks = await getTasksByColumnId(column._id);

        return { ...column, tasks };
      })
    );

    console.log(columnsWithTasks);

    return Response.json({ ...project, columns: columnsWithTasks });
  } catch (e) {
    console.error("getProject error", e);
    return Response.json(
      { error: "An error occurred", state: e },
      { status: 500 }
    );
  }
}
