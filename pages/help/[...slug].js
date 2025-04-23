export default function Help({ data }) {
  const page = data ? data.join("/") : "help";

  return (
    <div>
      <h1>Help: {page}</h1>
      <p>This is the {page} page.</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const slug = params.slug || [];
  return {
    props: {
      data,
    },
  };
}
