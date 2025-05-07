//FRONTEND aca se crea la nueva actividad
import ActivityForm from "@/components/ActivityForm";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import fetcher from "@/Lib/fetcher";

//el fetcher en otra carpeta

export default function CreateActivity() {
  const { data: activities, error } = useSWR("/api/activities", fetcher); // Obtener actividades actuales

  async function addActivity(activityData) {
    console.log("Datos que se están enviando:", activityData);
    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    const newActivity = await response.json();
    // Actualizar la lista de actividades + la nueva actividad
    mutate(
      "/api/activities",
      async (activities) => {
        return [newActivity, ...activities];
      },
      false
    );

    // router.push(""); // COMPLETAR ACA !! CUANDO TENGA EL ACTIVITY LIST
  }

  if (error) return <p>Error loading activities...</p>;
  if (!activities) return <p>Loading activities...</p>;

  return (
    <>
      <header>
        <h1>New Activity</h1>
      </header>

      <ActivityForm onSubmit={addActivity} />
    </>
  );
}
