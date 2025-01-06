import { useRouter } from "next/router";

export default function CatchAll() {
  const router = useRouter();
  const { slug } = router.query; // `slug` will be an array of path segments

  return (
    <div>
      <h1>Wildcard Route</h1>
      <p>Slug: {JSON.stringify(slug)}</p>
    </div>
  );
}
