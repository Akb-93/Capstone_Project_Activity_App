import styled from "styled-components";

export default function HeroCard({ title, subtitle, backgroundImageUrl }) {
  return (
    <Wrapper backgroundImageUrl={backgroundImageUrl}>
      <Overlay />
      <Content>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Content>
    </Wrapper>
  );
}

// Valores por defecto si no pasas props
HeroCard.defaultProps = {
  title: "Disconnect by connecting",
  subtitle:
    "Pick an interest, grab your crew, and let us handle the details — all in one place",
  backgroundImageUrl: "/img/cappadocia-ballooning.jpg",
};
const Wrapper = styled.header`
  position: relative;
  background-image: url(${(props) => props.backgroundImageUrl});
  background-size: cover;
  background-position: center;
  padding: var(--space-5) var(--space-3);
  border-radius: var(--radius-md);
  overflow: hidden;
  color: var(--c-neutral-000);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: var(--overlay-dark);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: var(--space-5) var(--space-3);
`;

const Title = styled.h1`
  font-size: var(--text-32);
  font-weight: var(--text-bold);
  margin: 0 0 var(--space-2) 0;
  font-family: var(--font-family);
`;

const Subtitle = styled.h2`
  font-size: var(--text-20);
  font-weight: var(--text-regular);
  margin: 0;
  font-family: var(--font-family);
`;
