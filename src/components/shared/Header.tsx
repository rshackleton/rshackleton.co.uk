import Navigation from '@components/shared/Navigation';
import React, { FC } from 'react';
import { Container, SiteWide, Title, TitleLink } from './Header.styles';

interface IHeaderProps {
  siteTitle: string;
}

const Header: FC<IHeaderProps> = ({ siteTitle }) => (
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
