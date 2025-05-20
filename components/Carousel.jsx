import { useState, useRef } from "react";
import Thumbnail from "./Thumbnail";
import styled from "styled-components";

export default function Carousel({ activities }) {
  const [scrollX, setScrollX] = useState(0); //esto  cuenta el desplazamiento horizontal actual (en pixeles).
  const containerRef = useRef(null); //guarda un ref que contiene las thumbnails, asi manipulo el scroll.

  const scrollAmount = 200; // cuanto se mueve en cada click

  //click a la izquierda
  const handleLeftClick = () => {
    if (!containerRef.current) return;

    const currentScroll = containerRef.current.scrollLeft;
    const newScroll = Math.max(currentScroll - scrollAmount, 0);

    containerRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  //click a la derecha
  const handleRightClick = () => {
    if (!containerRef.current) return;

    const currentScroll = containerRef.current.scrollLeft;
    const maxScroll =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const newScroll = Math.min(currentScroll + scrollAmount, maxScroll);

    containerRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };
  return (
    <Wrapper>
      <CircleButton onClick={handleLeftClick}>{"<"}</CircleButton>
      <CarouselContainer ref={containerRef}>
        {activities.map((activity) => (
          <Thumbnail key={activity._id} activity={activity} />
        ))}
      </CarouselContainer>
      <CircleButton onClick={handleRightClick}>{">"}</CircleButton>
    </Wrapper>
  );
}

//Carousel:
const Wrapper = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  justify-content: center;
`;

const CarouselContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  justify-content: flex-start;
  padding-left: 0.5rem;
  scroll-padding-left: 1rem;

  /* ocultar scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    scroll-snap-type: x mandatory;
  }


    &:first-child {
    margin-left: 1rem;
`;

const CircleButton = styled.button`
  font-size: 2rem;
  width: 40px;
  height: 40px;
  padding: 0; /* quita el padding para que el ancho y alto sean iguales */
  cursor: pointer;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 50%; /* para que sea redondo */
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
