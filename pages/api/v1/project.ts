import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id: 1, name: "Project Name" });
      break;
    case "POST":
      // Create a new record in your database
      res.status(201).json({ id: 2, name: "New Project Name" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
