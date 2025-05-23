import NavbarComponent from "@/components/Navbar";
import FooterComponent from "./Footer";
import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <>
      <NavbarComponent />
      <StyledMain>{children}</StyledMain>
      <FooterComponent />
    </>
  );
}

//Styled Components
const StyledMain = styled.main`
  margin-bottom: 4rem;
  max-width: 100%;
  overflow-x: hidden;
`;
