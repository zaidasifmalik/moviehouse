import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const db = await connectToDatabase();
    const genre = await db.collection("genres").findOne({ id });
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    res.status(200).json({ ...genre, _id: genre._id.toString() });
  } catch (error) {
    console.error("Error fetching genre:", error);
    res
      .status(500)
      .json({ message: "Error fetching genre", error: error.message });
  }
}
