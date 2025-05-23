//FRONTEND aca se crea la nueva actividad
import ActivityForm from "@/components/ActivityForm";
import HeroCard from "@/components/HeroCard";
import HeroImage from "@/public/images/zermatt-skiing.jpg";
import { useRouter } from "next/router";
import { mutate } from "swr";

export default function CreateActivity() {
  const router = useRouter();
  async function addActivity(activityData) {
    console.log("Datos que se están enviando al backend:", activityData);
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
    mutate("/api/activities");

    router.push("/activities");
  }

  function handleCancel() {
    router.push("/activities");
  }
  return (
    <>
      <HeroCard
        title="Add a New Activity"
        subtitle="Got a spark? Turn it into an experience."
        bgImage={HeroImage}
      />
      <ActivityForm onCancel={handleCancel} onSubmit={addActivity} />
    </>
  );
}
