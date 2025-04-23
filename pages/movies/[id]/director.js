import {
  getMovieById,
  getDirectorById,
  getMoviesByDirector,
  getMovies,
} from "../../../utils/data";

export default function Director({ director, movies }) {
  return (
    <div>
      <h1>{director.name}</h1>
      <p>{director.biography}</p>
      <h2>Movies Directed</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const movies = await getMovies();
  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const movie = await getMovieById(params.id);
  if (!movie) {
    return { notFound: true };
  }
  const director = await getDirectorById(movie.directorId);
  const movies = await getMoviesByDirector(movie.directorId);

  return {
    props: { director, movies },
    revalidate: 60,
  };
}
