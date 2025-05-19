import { useState, useEffect } from "react";
import HeroCard from "@/components/HeroCard";
import Carousel from "@/components/Carousel";
import useSWR, { mutate } from "swr";
import { StyledLinkButton } from "@/components/Style";
import styled from "styled-components";

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

//homepage:
const DescriptionText = styled.p`
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  border: 3px dashed #4a90e2; /* borde ondulado simulado con dashed */
  border-radius: 15px;
  padding: 15px 20px;
  margin-top: 20px;
  font-size: 1.1rem;
  color: #333;
  max-width: 600px; /* para que no ocupe todo el ancho */
  background: #f9faff;
`;

//line between carousel and descrption :
const Divider = styled.hr`
  margin: 40px auto;
  width: 80%;
  border: none;
  border-top: 2px solid #ccc;
`;

const StyledSpan = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;
