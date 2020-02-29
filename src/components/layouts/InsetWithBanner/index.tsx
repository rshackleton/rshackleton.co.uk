import React, { FC } from 'react';

import { Banner, ContainerInset, ContentWrapper } from './InsetWithBanner.styles';
import { ILayoutProps } from './InsetWithBanner.types';

const Layout: FC<ILayoutProps> = ({ banner, bannerDescription, children }) => {
  return (
    <ContentWrapper>
      <Banner image={banner} imageDescription={bannerDescription} />
      <ContainerInset>{children}</ContainerInset>
    </ContentWrapper>
  );
};

export default Layout;
