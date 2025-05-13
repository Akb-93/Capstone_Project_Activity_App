
import NavbarComponent from"@/components/Navbar";
import FooterComponent from "./Footer";
import { StyledMain } from "./Style";

export default function Layout ({ children }) {
  return (
    <>
      <NavbarComponent/>
      <StyledMain>{children}</StyledMain>
      <FooterComponent/>
    </>
  );
}
