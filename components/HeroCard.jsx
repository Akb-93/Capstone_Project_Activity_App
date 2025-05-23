import styled from "styled-components";

import Image from "next/image";

export default function HeroCard({ title, subtitle, backgroundImageUrl }) {
  return (
    <Wrapper>
      <StyledImage
        src={backgroundImageUrl}
        alt="Hero background"
        fill
        objectFit="cover"
        priority
        quality={80}
      />

      <Overlay />
      <Content>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Content>
    </Wrapper>
  );
}

HeroCard.defaultProps = {
  title: "Disconnect by connecting",
  subtitle:
    "Pick an interest, grab your crew, and let us handle the details — all in one place",
  backgroundImageUrl: "/img/cappadocia-ballooning.jpg",
};
const Wrapper = styled.header`
  position: relative;
  background-image: url(${(props) => props.backgroundImageUrl});
  width: 100%; /* Full viewport width */
  height: 280px; /* Fixed height */
  overflow: hidden;
  color: var(--c-neutral-000);
  text-align: center;
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

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: var(--overlay-dark);
  z-index: 1;
`;

const Content = styled.div`
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
  z-index: 2;
  text-align: left;
`;

const Title = styled.h1`
  font-size: var(--text-32);
  font-weight: 700;
  font-family: "Cabin", sans-serif;
  margin: 0 0 var(--space-1) 0;
  position: relative;
  z-index: 2;
`;
const Subtitle = styled.p`
  font-size: var(--text-20);
  margin: 0;
  position: relative;
  z-index: 2;
  font-family: "Cabin", sans-serif;
`;
