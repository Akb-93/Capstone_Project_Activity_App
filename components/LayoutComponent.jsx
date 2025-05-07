
import NavbarComponent from"@/components/Navbar";
import FooterComponent from "./Footer";
export default function Layout ({ Component, pageProps }) {
  return (
    <>
      <NavbarComponent/>
      
      <FooterComponent/>
    </>
  );
}
