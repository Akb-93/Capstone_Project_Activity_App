
import NavbarComponent from"@/components/Navbar";
import FooterComponent from "./Footer";

export default function Layout ({ children }) {
  return (
    <>
      <NavbarComponent/>
      <main>{children}</main>
      <FooterComponent/>
    </>
  );
}
