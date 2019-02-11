import PropTypes from 'prop-types';
import React from 'react';

import { Container, SiteWide, Legal } from './Footer.styles';

const Footer = () => (
  <Container>
    <SiteWide>
      <Legal>&copy; Richard Shackleton {new Date().getFullYear()}</Legal>
    </SiteWide>
  </Container>
);

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

export default Footer;
