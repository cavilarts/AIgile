import { Db, Collection, ObjectId } from "mongodb";
import clientPromise from "./mongoConnection";
import { User } from "@/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/auth";

let db: Db;
let user: Collection<User>;
let client;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db(process.env.DATABASE_NAME);
    user = db.collection("user");
  } catch (e) {
    console.error("MongoDB connection error", e);
  }
}

(async () => {
  await init();
})();

export async function getUser(id: string) {
  try {
    if (!user) await init();

    const result = await user.findOne({ _id: new ObjectId(id) });

    return {
      data: result,
    };
  } catch (e) {
    console.error("getUser error", e);
    return [];
  }
}

export async function getUserByEmail(email: string) {
  try {
    if (!user) await init();

    const result = await user.findOne({ email });

    if (!result) throw new Error("User not found");

    return {
      data: result,
    };
  } catch (e) {
    console.error("getUserByEmail error", e);
    return;
  }
}

export async function getSessionUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.email) {
    throw new Error("You must be signed in to submit a project");
  }

  const user = await getUserByEmail(session?.user?.email);
  if (!user || !user.data) {
    throw new Error("User not found");
  }

  return user;
}

export async function createUser(data: User) {
  try {
    if (!user) await init();

    const result = await user.insertOne({
      ...data,
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    });

    return result;
  } catch (e) {
    console.error("createUser error", e);
    return [];
  }
}

export async function patchUser(id: string, data: Partial<User>) {
  try {
    if (!user) await init();

    const result = await user.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          lastModifiedAt: new Date(),
        },
      }
    );

    return result;
  } catch (e) {
    console.error("updateUser error", e);
    return [];
  }
}
