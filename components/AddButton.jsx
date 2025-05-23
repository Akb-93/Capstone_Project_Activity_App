import { useRouter } from "next/router";
import styled from "styled-components";

export default function AddButton() {
  const router = useRouter();

  function handleClick() {
    router.push("./activities/create");
  }

  return <StyledAddButton onClick={handleClick}>+</StyledAddButton>;
}

//Styled components
const StyledAddButton = styled.button`
  position: fixed;
  bottom: var(--space-4);
  right: var(--space-3);
  background-color: var(--c-warm-500);
  color: var(--c-neutral-500);
  border: none;
  border-radius: var(--radius-pill);
  width: 50px;
  height: 50px;
  font-size: 30px;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
