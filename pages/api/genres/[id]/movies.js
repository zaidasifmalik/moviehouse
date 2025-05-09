import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const db = await connectToDatabase();
    const movies = await db
      .collection("movies")
      .find({ genreId: id })
      .toArray();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    res
      .status(500)
      .json({
        message: "Error fetching movies by genre",
        error: error.message,
      });
  }
}
