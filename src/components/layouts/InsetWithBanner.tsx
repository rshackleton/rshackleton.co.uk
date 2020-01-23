import { Global } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React, { ReactNode, FC } from 'react';

import Footer from '@components/shared/Footer';
import Header from '@components/shared/Header';
import ThemeWrapper from '@components/shared/ThemeWrapper';
import globalStyles from '@utils/globalStyles';

import {
  Banner,
  ContainerInset,
  ContentWrapper,
} from './InsetWithBanner.styles';

interface LayoutProps {
  banner: FluidObject;
  bannerDescription?: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ banner, bannerDescription, children }) => {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  );

  return (
    <ThemeWrapper>
      <Global styles={globalStyles} />
      <Header siteTitle={data.site.siteMetadata.title} />
      <ContentWrapper>
        <Banner image={banner} imageDescription={bannerDescription} />
        <ContainerInset>{children}</ContainerInset>
      </ContentWrapper>
      <Footer />
    </ThemeWrapper>
  );
};

export default Layout;
