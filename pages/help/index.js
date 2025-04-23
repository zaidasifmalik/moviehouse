import Link from "next/link";

export default function Help() {
  return (
    <div>
      <h1>Help Center</h1>
      <p>Welcome to the Movie House Help Center.</p>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
