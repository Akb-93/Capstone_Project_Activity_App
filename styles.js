import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  font-family: var(--font-family);
  }

  .mainWrapper {
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    text-align: center;
  }

  .title {
    font-size: 2rem;
    font-weight: 600;
    color: #4a3f35;
    margin: 0;
  }`;
