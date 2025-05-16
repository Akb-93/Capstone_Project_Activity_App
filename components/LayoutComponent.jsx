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
  padding: 1.5rem;
  margin-bottom: 4rem;
`;
