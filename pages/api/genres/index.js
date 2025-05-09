import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = await connectToDatabase();
    const genres = await db.collection("genres").find({}).toArray();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Error fetching genres", error });
  }
}
