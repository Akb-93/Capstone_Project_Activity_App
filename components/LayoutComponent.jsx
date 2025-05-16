import NavbarComponent from "@/components/Navbar";
import FooterComponent from "./Footer";

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
