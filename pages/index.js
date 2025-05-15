import HeroCard from "@/components/HeroCard";
import Carousel from "@/components/Carousel";
import useSWR, { mutate } from "swr";
import { DescriptionText } from "@/components/Style";

const fetcher = (url) => fetch(url).then((res) => res.json()); //para traer los datos

export default function HomePage() {
  const { data: activities, error } = useSWR("/api/activities", fetcher);

  if (error) return <div>Error al cargar actividades.</div>;
  if (!activities) return <div>Cargando...</div>;

  //the last 10 in carousel
  const latestActivities = activities.slice(-10).reverse();

  mutate("/api/activities");

  return (
    <main>
      <HeroCard title="Disconnect by connecting" />
      <Carousel activities={latestActivities} />
      <DescriptionText>
        Discover your next adventure. Explore outdoor, sports, cultural
        activities, and much more. Check out plans created by others, save your
        favorites, or create your own! Find something to do today—disconnect
        from your routine by connecting to our website.
      </DescriptionText>
    </main>
  );
}
