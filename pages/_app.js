import GlobalStyle from "../styles";
import HeaderComponent from"@/components/Header";
export default function App({ Component, pageProps }) {
  return (
    <>
      <HeaderComponent/>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
