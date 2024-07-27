import {
  getColumnsByProjectId,
  getProjectBySlug,
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
    if (!project) throw new Error("Project not found");
    const columns = await getColumnsByProjectId(String(project._id));

    console.log('columns', columns);

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    const columnsWithTasks = await Promise.all(
      columns.map(async (column) => {
        const tasks = await getTasksByColumnId(String(column._id));

        return { ...column, tasks };
      })
    );

    console.log('columnsWithTasks', columnsWithTasks);

    return Response.json({ ...project, columns: columnsWithTasks });
  } catch (e) {
    console.error("getProject error", e);
    return Response.json(
      { error: "An error occurred", state: e },
      { status: 500 }
    );
  }
}
