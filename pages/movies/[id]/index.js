import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getMovieById,
  getMovies,
  getDirectorById,
  getGenreById,
} from "../../../utils/data";

export default function MovieDetail({ movie, director, genre }) {
  if (!movie) {
    notFound();
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>
        Director:{" "}
        <Link href={`/movies/${movie.id}/director`}>{director.name}</Link>
      </p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Genre: {genre.name}</p>
      <p>Rating: {movie.rating}</p>
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
  const genre = await getGenreById(movie.genreId);

  return {
    props: { movie, director, genre },
    revalidate: 60,
  };
}
