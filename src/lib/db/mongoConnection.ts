import { MongoClient } from "mongodb";

const URI = process.env.DATABASE_URL;
const options = {};

if (!URI) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let client = new MongoClient(URI, options);
let clientPromise = client.connect();

if (
  process.env.NODE_ENV !== "production" &&
  !(global as { [key: string]: any })._mongoClientPromise
) {
  clientPromise =
    (global as { [key: string]: any })._mongoClientPromise ?? client.connect();
}

export default clientPromise;
