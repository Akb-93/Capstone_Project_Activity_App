import { useState, useRef } from "react";
import Thumbnail from "./Thumbnail";
import styled from "styled-components";

export default function Carousel({ activities, from }) {
  const containerRef = useRef(null);
  const scrollAmount = 200;

  const handleScroll = (direction) => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      <CircleButton onClick={() => handleScroll("left")}>{"<"}</CircleButton>
      <CarouselContainer ref={containerRef}>
        {activities.map((activity) => (
          <Thumbnail key={activity._id} activity={activity} from={from} />
        ))}
      </CarouselContainer>
      <CircleButton onClick={() => handleScroll("right")}>{">"}</CircleButton>
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

  @media (min-width: 769px) {
    max-width: 900px;
    margin: 0 auto;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  justify-content: flex-start;

  scroll-padding-left: 1rem;

  /* ocultar scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CircleButton = styled.button`
  font-size: 2rem;
  width: 40px;
  height: 40px;
  padding: 0;
  cursor: pointer;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 50%;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
