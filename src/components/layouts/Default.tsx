import { Global } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';
import React, { ReactNode, FC } from 'react';

import Footer from '@components/shared/Footer';
import Header from '@components/shared/Header';
import ThemeWrapper from '@components/shared/ThemeWrapper';
import globalStyles from '@utils/globalStyles';

import { ContentWrapper } from './Default.styles';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
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
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </ThemeWrapper>
  );
};

export default Layout;
