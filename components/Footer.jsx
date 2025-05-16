import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FooterWrapper, FooterList, FooterItem, FooterLink } from "./Style";



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
