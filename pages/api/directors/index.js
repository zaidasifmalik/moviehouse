import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = await connectToDatabase();
    const directors = await db.collection("directors").find({}).toArray();
    res.status(200).json(directors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching directors", error });
  }
}
