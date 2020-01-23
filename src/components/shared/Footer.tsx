import React, { FC } from 'react';

import { Container, SiteWide, Legal } from './Footer.styles';

const Footer: FC<{}> = () => (
  <Container>
    <SiteWide>
      <Legal>&copy; Richard Shackleton {new Date().getFullYear()}</Legal>
    </SiteWide>
  </Container>
);

export default Footer;
