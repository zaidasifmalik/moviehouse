import Link from "next/link";
import { useState } from "react";
import { getMovies, getGenres } from "../../utils/data";

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState("");

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genreId === selectedGenre)
    : movies;

  return (
    <div>
      <h1>All Movies</h1>
      <div>
        <label>Filter by Genre: </label>
        <select
          onChange={(e) => setSelectedGenre(e.target.value)}
          value={selectedGenre}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const movies = await getMovies();
  const genres = await getGenres();
  return {
    props: { movies, genres },
    revalidate: 60,
  };
}
