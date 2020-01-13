import React, { FC } from 'react';

import Navigation from '@components/shared/Navigation';

import { Container, SiteWide, Title, TitleLink } from './Header.styles';

interface HeaderProps {
  siteTitle: string;
}

const Header: FC<HeaderProps> = ({ siteTitle }) => (
  <Container>
    <SiteWide>
      <Title>
        <TitleLink to="/">{siteTitle}</TitleLink>
      </Title>
      <Navigation />
    </SiteWide>
  </Container>
);

export default Header;
