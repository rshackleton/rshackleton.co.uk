import { Global } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';
import React, { ReactNode } from 'react';

import ThemeWrapper from '@components/connected/ThemeWrapper';

import Footer from '@components/presentation/Footer';
import Header from '@components/presentation/Header';

import SearchModal, { SearchModalProvider } from '@components/search/SearchModal';

import globalStyles from '@utils/globalStyles';

import { PageContext, PageContextProvider } from './PageContext';

interface IPageRootProps {
  children: ReactNode;
  pageContext: PageContext;
}

const PageRoot: React.FC<IPageRootProps> = ({ children, pageContext }) => {
  const data = useStaticQuery(
    graphql`
      query PageRootSiteData {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  );

  return (
    <PageContextProvider value={pageContext}>
      <ThemeWrapper>
        <SearchModalProvider>
          <SearchModal />
          <Global styles={globalStyles} />
          <Header siteTitle={data.site.siteMetadata.title} />
          {children}
          <Footer />
        </SearchModalProvider>
      </ThemeWrapper>
    </PageContextProvider>
  );
};

export default PageRoot;
