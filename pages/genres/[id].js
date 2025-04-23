import { getGenreById, getMoviesByGenre } from "../../utils/data";

export default function GenreMovies({ genre, movies }) {
  if (!genre) {
    return <div>Genre not found</div>;
  }

  return (
    <div>
      <h1>{genre.name} Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const genre = await getGenreById(params.id);
  if (!genre) {
    return { notFound: true };
  }
  const movies = await getMoviesByGenre(params.id);

  return {
    props: { genre, movies },
  };
}
