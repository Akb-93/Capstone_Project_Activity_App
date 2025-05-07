import ActivityForm from "@/components/ActivityForm";
import HeroCard from "@/components/HeroCard";
import { useRouter } from "next/router";
import useSWR from "swr";


export default function EditActivityPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: activities, error, mutate } = useSWR(
    id ? `/api/activities/${id}` : null
  );

  async function editActivity({ activityData }) {
    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    mutate();
    router.push(`/places/${id}`)
  }

  if (error) return <p>Error loading activity...</p>;
  if (!activities) return <p>Loading activity...</p>;

  return (
    <>
      <HeroCard title={"Edit Activity"}/>
      <ActivityForm onSubmit={editActivity} inputData={activities} />
    </>
  );
}

