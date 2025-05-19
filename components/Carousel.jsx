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
    const newScrollX = Math.max(scrollX - scrollAmount, 0);
    setScrollX(newScrollX);
    containerRef.current.scrollTo({
      left: newScrollX,
      behavior: "smooth",
    });
  };

  //click a la derecha
  const handleRightClick = () => {
    if (!containerRef.current) return;
    const maxScroll =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const newScrollX = Math.min(scrollX + scrollAmount, maxScroll);
    setScrollX(newScrollX);
    containerRef.current.scrollTo({
      left: newScrollX,
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
const Wrapper = styled.div`
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
  width: 50%;
  overflow-x: auto;
  scroll-behavior: smooth;
  justify-content: flex-start;

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

  /* cada thumbnail se ajustará con snap */
  & > * {
    scroll-snap-align: center;
  }
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
