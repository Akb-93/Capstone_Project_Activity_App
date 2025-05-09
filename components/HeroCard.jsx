import styled from "styled-components";

export default function HeroCard({ title, children }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  background-color: #f5f5dc;
  border: 2px solid rgb(9, 9, 8);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #4a3f35;
  margin: 0;
`;
