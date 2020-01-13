import React, { FC } from 'react';

import { Container, SiteWide, Legal } from './Footer.styles';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <Container>
    <SiteWide>
      <Legal>&copy; Richard Shackleton {new Date().getFullYear()}</Legal>
    </SiteWide>
  </Container>
);

export default Footer;
