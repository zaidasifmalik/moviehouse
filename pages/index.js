import { useRouter } from "next/router";
import { getTrendingMovies } from "../utils/data";

export default function Home({ movies }) {
  const router = useRouter();

  return (
    <div>
      <h1>Movie House</h1>
      <h2>Trending Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push("/genres")}>Browse Genres</button>
    </div>
  );
}

export async function getStaticProps() {
  const movies = await getTrendingMovies();
  return {
    props: { movies },
    revalidate: 60,
  };
}
