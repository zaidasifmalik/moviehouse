import Link from "next/link";
import { getGenres } from "../../utils/data";

export default function Genres({ genres }) {
  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const genres = await getGenres();
  return {
    props: { genres },
  };
}
