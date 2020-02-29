import React, { FC } from 'react';

import Navigation from '@components/presentation/Navigation';

import { Container, SiteWide, Title, TitleLink } from './Header.styles';
import { IHeaderProps } from './Header.types';

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
