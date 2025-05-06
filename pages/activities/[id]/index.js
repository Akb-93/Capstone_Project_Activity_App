import { useRouter } from "next/router";
import useSWR from "swr";

export default function ActivityDetailPage() {
  const router = useRouter();
  const { id } = router.query; //to access [id] from the route

  //swr fetch activity data from API route
  const {
    data: activity,
    error,
    isLoading,
  } = useSWR(id ? `/api/activities/${id}` : null);

  if (error) return <p>Failed to load activity.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!activity) return <p>No activity found.</p>;

  return (
    <main className="detailsPage">
      <header
        className="heroBanner"
        style={{
          backgroundImage: `url(${activity.imageUrl || "placeholder.jpg"})`, //use fallback if image missing
        }}
      >
        <button className="backButton" onClick={() => router.back()}>
          ←
        </button>
        <h1 className="heroTitle">{activity.title}</h1>
      </header>

      <section className="categoriesList">
        <strong>Categories:</strong>{" "}
        {activity.categories?.length ? (
          activity.categories.map((cat) => (
            <span key={cat._id} className="categoryTag">
              {cat.name}
            </span>
          ))
        ) : (
          <span>No categories</span>
        )}
      </section>

      <p className="descriptionText">
        {activity.description || "No description available."}
      </p>

      <p className="locationInfo">
        {activity.area && <span> Area: {activity.area}</span>}
        {activity.country && <span> Country: {activity.country}</span>}
      </p>
    </main>
  );
}
