import { FluidObject } from 'gatsby-image';
import React, { FC, ReactNode } from 'react';
import {
  Banner,
  ContainerInset,
  ContentWrapper,
} from './InsetWithBanner.styles';

interface ILayoutProps {
  banner: FluidObject;
  bannerDescription?: string;
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ banner, bannerDescription, children }) => {
  return (
    <ContentWrapper>
      <Banner image={banner} imageDescription={bannerDescription} />
      <ContainerInset>{children}</ContainerInset>
    </ContentWrapper>
  );
};

export default Layout;
