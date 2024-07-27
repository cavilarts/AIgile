import { getProjectByUser, getUserByEmail } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  console.log(email);

  if (!email) {
    return Response.json(
      { error: "Please provide all required fields" },
      { status: 400 }
    );
  }

  try {
    const user = await getUserByEmail(email);

    console.log(user);

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const project = await getProjectByUser(user.data._id);
    return Response.json({ project });
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}
