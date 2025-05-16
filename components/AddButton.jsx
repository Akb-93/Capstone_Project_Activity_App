import { useRouter } from "next/router";

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
  bottom: 20px;
  right: 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:hover {
    background-color: #0056b3;
  }
`;
