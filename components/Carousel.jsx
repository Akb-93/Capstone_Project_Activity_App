import { useState, useRef } from "react";
import Thumbnail from "./Thumbnail";
import { CircleButton, Wrapper, CarouselContainer } from "./Style";

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
