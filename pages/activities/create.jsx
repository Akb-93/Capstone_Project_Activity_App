//FRONTEND aca se crea la nueva actividad
import ActivityForm from "@/components/ActivityForm";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CreateActivity() {
  const router = useRouter();
  const { data: activities, error: activitiesError } = useSWR(
    //ESTO LO NECESITO DEL GET CON LAS ACTIVIDADES PORQUE ABAJO USO MUTATE Y AHI TENGO QUE TRAER LAS ACTIVIDADES PARA ORGANIZARLAS Y PONER LA NUEVA PRIMERO!
    "/api/activities",
    fetcher
  ); // Obtener actividades desde GET el backend
  if (activitiesError) return <p>Error loading data...</p>;
  if (!activities) return <p>Loading...</p>;

  async function addActivity(activityData) {
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
      (activities) => {
        return [newActivity, ...activities];
      },
      false
    );

    // router.push("/activities"); // COMPLETAR ACA !! CUANDO TENGA EL ACTIVITY LIST
  }

  return (
    <>
      <ActivityForm onSubmit={addActivity} />
    </>
  );
}
