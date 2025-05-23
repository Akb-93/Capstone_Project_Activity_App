import React from "react";
import Link from "next/link";
import styled from "styled-components";

const FooterComponent = () => {
  return (
    <FooterWrapper>
      <FooterList>
        <FooterItem>
          <FooterLink href="/activities">Activities</FooterLink>
        </FooterItem>
        <FooterItem>
          <FooterLink href="/favorites">Favorites</FooterLink>
        </FooterItem>
        <FooterItem>
          <FooterLink href="/">Homepage</FooterLink>
        </FooterItem>
      </FooterList>
      <FooterText>Made with ❤️ and 😣 and 😭 by the AAAJ collective</FooterText>
    </FooterWrapper>
  );
};

export default FooterComponent;

//Styled Components
const FooterWrapper = styled.footer`
  background-color: var(--c-dark-700);
  width: 100%;
  padding: var(--space-5) var(--space-3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  overflow-x: hidden;
`;

const FooterText = styled.p`
  font-size: var(--text-14);
  color: var(--c-neutral-000);
  text-align: center;
  margin: var(--space-3) var(--space-5);
`;

const FooterList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 1200px;
`;

const FooterItem = styled.li`
  list-style-type: none;
  margin: 0 var(--space-3);
`;

const FooterLink = styled(Link)`
  text-decoration: underline;
  color: var(--c-neutral-000);
  font-size: var(--text-14);
`;
