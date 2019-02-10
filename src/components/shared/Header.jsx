import PropTypes from 'prop-types';
import React from 'react';

import Navigation from '@components/shared/Navigation';

import { Container, SiteWide, Title, TitleLink } from './Header.styles';

const Header = ({ siteTitle }) => (
  <Container>
    <SiteWide>
      <Title>
        <TitleLink to="/">{siteTitle}</TitleLink>
      </Title>
      <Navigation />
    </SiteWide>
  </Container>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

export default Header;
