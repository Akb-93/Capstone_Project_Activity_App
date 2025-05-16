import { useState, useEffect } from "react";
import HeroCard from "@/components/HeroCard";
import Carousel from "@/components/Carousel";
import useSWR, { mutate } from "swr";
import {
  DescriptionText,
  Divider,
  LeftEdge,
  RightEdge,
  StyledLinkButton,
  StyledSpan,
  Wrapper,
} from "@/components/Style";
import Link from "next/link";


const fetcher = (url) => fetch(url).then((res) => res.json()); //para traer los datos

export default function HomePage() {
  const { data: activities, error } = useSWR("/api/activities", fetcher);

  const [isMobile, setIsMobile] = useState(false); //un nuevo estado para la cantidad de thumbnails visibles

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 500);
    }

    handleResize(); // lo ejecuta una vez al cargar
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (error) return <div>Error al cargar actividades.</div>;
  if (!activities) return <div>Cargando...</div>;

  // se muestran 5 si es mobile, 10 si no
  const visibleActivities = isMobile
    ? activities.slice(0, 5)
    : activities.slice(0, 10);

  mutate("/api/activities");

  return (
    <main>
      <HeroCard title="Disconnect by connecting" />

      <Carousel activities={visibleActivities} />

      <Divider />
      <DescriptionText>
        <StyledSpan>Discover your next adventure. </StyledSpan>
        Explore outdoor, sports, cultural activities, and much more. Check out
        plans created by others, save your favorites, or create your own! Find
        something to do today—disconnect from your routine by connecting to our
        website.
      </DescriptionText>
      <StyledLinkButton href="/activities">
        Go to Activity List →
      </StyledLinkButton>
    </main>
  );
}
