import { useState, useEffect } from "react";
import HeroCard from "@/components/HeroCard";
import Carousel from "@/components/Carousel";
import useSWR from "swr";
import { StyledLink } from "@/components/StyledComponents";
import styled from "styled-components";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false); //un nuevo estado para la cantidad de thumbnails visibles

  const limit = isMobile ? 5 : 10;
  const { data: activities, error } = useSWR(`/api/activities?limit=${limit}`);

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

  return (
    <>
      <HeroCard title="Disconnect by connecting" />
      <Carousel activities={activities} />

      <DescriptionSection>
        <StyledH2>Discover your next adventure. </StyledH2>
        <DescriptionText>
          Explore outdoor, sports, cultural activities, and much more. Check out
          plans created by others, save your favorites, or create your own! Find
          something to do today—disconnect from your routine by connecting to
          our website.
        </DescriptionText>
        <StyledLink href="/activities">Go to Activity List →</StyledLink>
      </DescriptionSection>
    </>
  );
}

const DescriptionSection = styled.section`
  background: #f9faff;
  padding: 24px 48px;
`;
const StyledH2 = styled.h2`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 15px 20px;
  font-size: 2rem;
  color: #000;
`;
const DescriptionText = styled.p`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 15px 20px;
  font-size: 1.1rem;
  color: #333;
`;
