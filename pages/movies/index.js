import { useState } from "react";
import { Box, Heading, Input, Select, SimpleGrid } from "@chakra-ui/react";
import useSWR from "swr";
import MovieCard from "../../components/MovieCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Movies() {
  const { data: movies, error: moviesError } = useSWR("/api/movies", fetcher);
  const { data: genres, error: genresError } = useSWR("/api/genres", fetcher);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  if (moviesError || genresError) return <Box>Error loading data</Box>;
  if (!movies || !genres) return <Box>Loading...</Box>;

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre ? movie.genreId === selectedGenre : true;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <Box p={4}>
      <Heading mb={6}>All Movies</Heading>
      <Box mb={4}>
        <Input
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
        />
        <Select
          placeholder="Filter by Genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre) => (
            <option key={genre._id} value={genre._id}>
              {genre.name}
            </option>
          ))}
        </Select>
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
