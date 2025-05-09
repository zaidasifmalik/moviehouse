import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const db = await connectToDatabase();
    const director = await db.collection("directors").findOne({ id });
    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }
    const movies = await db
      .collection("movies")
      .find({ directorId: id })
      .toArray();
    res.status(200).json({
      ...director,
      _id: director._id.toString(),
      movies: movies.map((movie) => ({ ...movie, _id: movie._id.toString() })),
    });
  } catch (error) {
    console.error("Error fetching director:", error);
    res
      .status(500)
      .json({ message: "Error fetching director", error: error.message });
  }
}
