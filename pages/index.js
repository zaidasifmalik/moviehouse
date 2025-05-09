import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import MovieCard from "../components/MovieCard";
import { connectToDatabase } from "../lib/mongodb";

export default function Home({ movies }) {
  return (
    <Box p={4}>
      <Heading mb={6}>Trending Movies</Heading>
      {movies.length === 0 ? (
        <Box>No trending movies available.</Box>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export async function getStaticProps() {
  try {
    const db = await connectToDatabase();
    const movies = await db
      .collection("movies")
      .find({ rating: { $gte: 8.5 } })
      .toArray();
    // Convert MongoDB documents to plain objects and ensure string IDs
    const serializedMovies = movies.map((movie) => ({
      ...movie,
      _id: movie._id.toString(),
      id: movie.id || movie._id.toString(),
    }));
    return {
      props: { movies: serializedMovies },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching movies in getStaticProps:", error);
    return {
      props: { movies: [] },
      revalidate: 60,
    };
  }
}
