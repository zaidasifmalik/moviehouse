import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const db = await connectToDatabase();
    const movie = await db.collection("movies").findOne({ id });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    // Convert _id to string
    res.status(200).json({ ...movie, _id: movie._id.toString() });
  } catch (error) {
    console.error("Error fetching movie:", error);
    res
      .status(500)
      .json({ message: "Error fetching movie", error: error.message });
  }
}
