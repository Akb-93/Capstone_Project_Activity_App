import ActivityForm from "@/components/ActivityForm";
import HeroCard from "@/components/HeroCard";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function EditActivityPage() {
  const router = useRouter();
  const { id, from } = router.query;
  const { data: activities, error, mutate } = useSWR(
    id ? `/api/activities/${id}` : null
  );

  async function editActivity(activityData) {

    console.log("PUT:", activityData);

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
    router.push(from);
  }

  if (error) return <p>Error loading edit form...</p>;
  if (!activities) return <p>Loading edit form...</p>;

  function handleCancel() {
    if (from) {
      router.push(`/activities/${id}?from=${from}`);
    } else {
      router.push(`/activities/${id}`);
    }
  }

  return (
    <>
      <HeroCard title={"Edit Activity"} />
      <ActivityForm onCancel={handleCancel} onSubmit={editActivity} inputData={activities} />
    </>
  );
}