//activities list where we put all the components
import useSWR from "swr";
import HeroCard from "@/components/HeroCard";
import ActivityCard from "@/components/ActivityCard";

export default function ActivitiesPage() {
  const { data: activities, error, isLoading } = useSWR("/api/activities");

  if (error) return <p>Failed to load activities.</p>;
  if (isLoading) return <p>Loading activities...</p>;
  if (!activities || activities.length === 0)
    return <p>No activities available.</p>;
  return (
    <main className="mainWrapper">
      <HeroCard title="Activities List">
        <p>Choose your fun</p>
      </HeroCard>

      <section className="activityGrid">
        {activities.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
      </section>
    </main>
  );
}
