import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleActivitiesClick = () => {
    setIsMenuOpen(false);
    console.log("Navigating to Activities");
  };
  const handleFavoritesClick = () => {
    setIsMenuOpen(false);
    console.log("Navigating to Favorites");
  };
  const handleHomepageClick = () => {
    setIsMenuOpen(false);
    console.log("Navigating to Homepage");
  };
  return (
    <Header>
      <Link href="/">
        <LogoContainer>
          <Logo src="/img/logo5.png" alt="Logo" fill />
        </LogoContainer>
      </Link>
      <Nav ref={menuRef}>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <MenuIconImg src="/img/x.svg" alt="Close Menu" />
          ) : (
            <MenuIconImg src="/img/menu.svg" alt="Open Menu" />
          )}
        </MenuButton>
        {isMenuOpen && (
          <DropdownList>
            <DropdownListItem>
              <Link href="/activities">
                <DropdownButton onClick={handleActivitiesClick}>
                  Activities
                </DropdownButton>
              </Link>
            </DropdownListItem>
            <DropdownListItem>
              <Link href="/favorites">
                <DropdownButton onClick={handleFavoritesClick}>
                  Favorites
                </DropdownButton>
              </Link>
            </DropdownListItem>
            <DropdownListItem>
              <Link href="/">
                <DropdownButton onClick={handleHomepageClick}>
                  Homepage
                </DropdownButton>
              </Link>
            </DropdownListItem>
          </DropdownList>
        )}
      </Nav>
    </Header>
  );
};
export default NavbarComponent;
//Styled Components
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #ccc;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;
const Nav = styled.nav`
  background: none;
`;
const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 0;
`;
const MenuIconImg = styled.img`
  width: 24px;
  height: 24px;
`;
const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: fixed;
  right: 0;
  top: 5rem;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;
const DropdownListItem = styled.li`
  font-size: 2rem;
`;
const DropdownButton = styled.button`
  text-decoration: none;
  background: none;
  border: none;
  padding: 10px;
  display: block;
  width: 100%;
  text-align: left;
`;
//logo
const LogoContainer = styled.div`
  width: 90px;
  height: 90px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.5);
  }
`;
