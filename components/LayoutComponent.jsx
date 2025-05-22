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
  padding: var(--space-5) var(--space-3);
  max-width: 100%;
  overflow-x: hidden;
`;
