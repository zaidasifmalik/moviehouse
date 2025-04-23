import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => router.push("/")}>Go Home</button>
    </div>
  );
}
