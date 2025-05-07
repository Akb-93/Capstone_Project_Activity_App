//FRONTEND aca se crea la nueva actividad
import ActivityForm from "@/components/ActivityForm";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

//obtener los datos de las actividades
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CreateActivity() {
  const router = useRouter();
  const { data: activities, error } = useSWR("/api/activities", fetcher); // Obtener actividades actuales

  async function addActivity({ activityData }) {
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

    // Actualizar la lista de actividades + la nueva actividad
    const newActivity = await response.json();
    mutate("/api/activities", [newActivity, ...activities], false); // Actualizamos las actividades en cache
    router.push("/"); // Redirigir a la página principal
  }

  if (error) return <p>Error loading activities...</p>;
  if (!activities) return <p>Loading activities...</p>;

  return (
    //aca header que esta haciendo alissa, temporal h1
    <div>
      <>
        <h1></h1>
        <ActivityForm onSubmit={addActivity} />
      </>
    </div>
  );
}
