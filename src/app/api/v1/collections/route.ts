import { getCollections } from "@/lib/db/collections";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // @TODO remove when is in production
  try {
    const results = await getCollections();

    return Response.json(results, { status: 200 });
  } catch (error) {
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
