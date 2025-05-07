import ActivityForm from "@/components/ActivityForm";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

export default function EditActivityPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: activities, error, mutate } = useSWR(`/api/activities/${id}`);

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

  if (error) return <p>Error loading activities...</p>;
  if (!activities) return <p>Loading activities...</p>;

  return (
    //aca header que esta haciendo alissa, temporal h1
    <>
      <h1></h1>
      <ActivityForm onSubmit={editActivity} />
    </>
  );
}

