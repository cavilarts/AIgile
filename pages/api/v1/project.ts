import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      if (!id) {
        res.status(400).json({ error: "Missing project id" });
      } else {
        res.status(200).json({ id: id, name: "Project Name" });
      }
      break;
    case "POST":
      res.status(201).json({ id: id, name: "New Project Name" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
