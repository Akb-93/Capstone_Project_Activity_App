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
    </FooterWrapper>
  );
};

export default FooterComponent;

//Styled Components
const FooterWrapper = styled.footer`
  background-color: #ccc;
  width: 100%;
  padding: 50px;
`;

const FooterList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const FooterItem = styled.li`
  list-style-type: none;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
`;
