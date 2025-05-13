import { useRouter } from "next/router";
import { StyledAddButton } from "./Style";

export default function AddButton() {
  const router = useRouter();

  function handleClick() {
    router.push("./activities/create");
  }

  return <StyledAddButton onClick={handleClick}>+</StyledAddButton>;
}
