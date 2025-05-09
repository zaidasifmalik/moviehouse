import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import MovieCard from "../../components/MovieCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function GenreMovies() {
  const router = useRouter();
  const { id } = router.query;
  const { data: genre } = useSWR(id ? `/api/genres/${id}` : null, fetcher);
  const { data: movies, error } = useSWR(
    id ? `/api/genres/${id}/movies` : null,
    fetcher
  );

  if (error) return <Box>Error loading movies</Box>;
  if (!genre || !movies) return <Box>Loading...</Box>;

  return (
    <Box p={4}>
      <Heading mb={6}>{genre.name} Movies</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
