import { useState, useEffect } from "react";
import HeroCard from "@/components/HeroCard";
import Carousel from "@/components/Carousel";
import useSWR from "swr";
import { StyledLink } from "@/components/StyledComponents";
import styled from "styled-components";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false); //un nuevo estado para la cantidad de thumbnails visibles

  const limit = isMobile ? 5 : 10;
  const { data: activities, error } = useSWR(
    `/api/activities/carouselLimited?limit=${limit}`
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
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
      </DescriptionSection>
      <CenteredWrapper>
        <StyledLink href="/activities">Explore activities</StyledLink>
      </CenteredWrapper>
    </>
  );
}

const DescriptionSection = styled.section`
  background: var(--c-neutral-050);
  padding: var(--space-3) var(--space-3);

  border-radius: var(--radius-md);
  border: 1.5px solid #ffb3b8;
  box-shadow: 0 2px 6px rgba(255, 179, 184, 0.3);
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 0 auto;
`;
const StyledH2 = styled.h2`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: var(--space-3) var(--space-3);

  font-size: var(--text-24);
  font-weight: var(--text-bold);
  color: #000;
`;
const DescriptionText = styled.p`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: var(--space-3) var(--space-3);

  font-size: var(--text-20);
  color: #333;
`;
const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--space-5);
`;
