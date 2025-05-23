import { useRef } from "react";
import Thumbnail from "./Thumbnail";
import styled from "styled-components";

export default function Carousel({ activities }) {
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
          <Thumbnail key={activity._id} activity={activity} />
        ))}
      </CarouselContainer>
      <CircleButton onClick={() => handleScroll("right")}>{">"}</CircleButton>
    </Wrapper>
  );
}

// Carousel styles
const Wrapper = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--space-5) var(--space-3);
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

  scroll-padding-left: var(--space-3);

  /* ocultar scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CircleButton = styled.button`
  width: 50px;
  height: 50px;
  font-size: var(--text-20);
  cursor: pointer;
  background-color: #fff0f2;
  color: var(--c-dark-600);
  border-radius: 50%;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1.5px solid #ffb3b8;
  box-shadow: 0 2px 6px rgba(255, 179, 184, 0.3);
  margin: 0 4px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #ffccd1;
    color: var(--c-dark-600);
  }
`;
