import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    position: fixed;
    bottom:0;
    background-color: #ccc;
    width: 100%;
`;

const FooterList = styled.ul`
    display:flex;
    flex-direction: column;
    align-items: center;
`;

const FooterItem = styled.li`
 list-style-type: none;
`;

const FooterLink = styled(Link)`
  
  text-decoration: none;
 
`;

const FooterComponent = () => {
    return (
        <FooterWrapper>
            <FooterList>
                <FooterItem>
                    <FooterLink href="/activities">
                        Activities
                    </FooterLink>
                </FooterItem>
                <FooterItem>
                    <FooterLink href="/favorites">
                        Favorites
                    </FooterLink>
                </FooterItem>
            </FooterList>
        </FooterWrapper>
    );
};

export default FooterComponent;
