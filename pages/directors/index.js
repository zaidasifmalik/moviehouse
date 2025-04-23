import useSWR from "swr";
import { getDirectors, getMoviesByDirector } from "../../utils/data";

const fetcher = async () => {
  const directors = await getDirectors();
  const directorsWithMovies = await Promise.all(
    directors.map(async (director) => {
      const movies = await getMoviesByDirector(director.id);
      return { ...director, movies };
    })
  );
  return directorsWithMovies;
};

export default function Directors() {
  const { data: directors, error } = useSWR("directors", fetcher);

  if (error) return <div>Error loading directors</div>;
  if (!directors) return <div>Loading...</div>;

  return (
    <div>
      <h1>Directors</h1>
      {directors.map((director) => (
        <div key={director.id}>
          <h2>{director.name}</h2>
          <p>{director.biography}</p>
          <h3>Movies Directed</h3>
          <ul>
            {director.movies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
