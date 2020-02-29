import React, { FC } from 'react';

import { Container, Legal, SiteWide } from './Footer.styles';
import { IFooterProps } from './Footer.types';

const Footer: FC<IFooterProps> = () => (
  <Container>
    <SiteWide>
      <Legal>&copy; Richard Shackleton {new Date().getFullYear()}</Legal>
    </SiteWide>
  </Container>
);

export default Footer;
