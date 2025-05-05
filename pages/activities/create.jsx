//FRONTEND aca se crea la nueva actividad
import ActivityForm from "@/components/ActivityForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreateActivity() {
  const router = useRouter();
  const { mutate } = useSWR(); //API()

  async function addActivity({ activityData }) {
    const response = await fetch("/", {
      //API dentro()
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    mutate();
    event.target.reset();
    router.push("/");
  }

  return (
    //aca header que esta haciendo alissa, temporal h1
    <>
      <h1></h1>
      <ActivityForm onSubmit={addActivity} />
    </>
  );
}
