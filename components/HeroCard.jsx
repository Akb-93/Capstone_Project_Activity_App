import styled from "styled-components";
import Image from "next/image";
export default function HeroCard({ title, subtitle, bgImage }) {

  return (
    <Wrapper>
      <StyledImage
        src={bgImage}
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        priority
        quality={80}
      />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Wrapper>
  );
}
//Styled Components
const Wrapper = styled.header`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  color: var(--c-neutral-000);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: var(--space-2);
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    z-index: 1;
    pointer-events: none;
  }
`;
const StyledImage = styled(Image)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  z-index: 0;
`;
const Title = styled.h1`
  font-size: var(--text-32);
  font-weight: var(--text-bold);
  margin: 0 0 var(--space-1) 0;
  position: relative;
  z-index: 2;
`;
const Subtitle = styled.p`
  font-size: var(--text-20);
  margin: 0;
  position: relative;
  z-index: 2;
`;
