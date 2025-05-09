import { Box, Heading, Text, Button } from "@chakra-ui/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch movie data
  const { data: movie, error: movieError } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher
  );

  // Only fetch director and genre if movie data is available
  const { data: director, error: directorError } = useSWR(
    movie && movie.directorId ? `/api/directors/${movie.directorId}` : null,
    fetcher
  );
  const { data: genre, error: genreError } = useSWR(
    movie && movie.genreId ? `/api/genres/${movie.genreId}` : null,
    fetcher
  );

  if (movieError || directorError || genreError) {
    return <Box>Error loading movie details</Box>;
  }
  if (!movie || !director || !genre) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box p={4}>
      <Heading>{movie.title}</Heading>
      <Text mt={2}>{movie.description}</Text>
      <Text mt={2}>
        Director:{" "}
        <Link href={`/directors/${movie.directorId}`}>
          <Button variant="link">{director.name}</Button>
        </Link>
      </Text>
      <Text mt={2}>Release Year: {movie.releaseYear}</Text>
      <Text mt={2}>Genre: {genre.name}</Text>
      <Text mt={2}>Rating: {movie.rating}</Text>
    </Box>
  );
}
