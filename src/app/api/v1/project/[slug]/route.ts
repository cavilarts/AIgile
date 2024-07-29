import {
  getColumnsByProjectId,
  getProjectBySlug,
  getTasksQuery,
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
    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }
    const columns = await getColumnsByProjectId(String(project._id));
    if (!columns) {
      return Response.json(
        { error: "An error occurred while fetching columns" },
        { status: 500 }
      );
    }

    const columnsWithTasks = await Promise.all(
      columns.map(async (column) => {
        const tasks = await getTasksQuery({
          columnId: String(column._id),
          projectId: String(project._id),
        });

        return { ...column, tasks };
      })
    );

    if (!columnsWithTasks) {
      return Response.json(
        { error: "An error occurred while fetching tasks" },
        { status: 500 }
      );
    }
    return Response.json({ ...project, columns: columnsWithTasks });
  } catch (e) {
    console.error("getProject error", e);
    return Response.json(
      { error: "An error occurred", state: e },
      { status: 500 }
    );
  }
}
