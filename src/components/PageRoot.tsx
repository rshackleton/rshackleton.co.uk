import SearchModal, {
  SearchModalProvider,
} from '@components/search/SearchModal';
import Footer from '@components/shared/Footer';
import Header from '@components/shared/Header';
import ThemeWrapper from '@components/shared/ThemeWrapper';
import { Global } from '@emotion/core';
import globalStyles from '@utils/globalStyles';
import { graphql, useStaticQuery } from 'gatsby';
import React, { ReactNode } from 'react';
import { PageContext, PageContextProvider } from './PageContext';

interface IPageRootProps {
  children: ReactNode;
  pageContext: PageContext;
}

const PageRoot: React.FC<IPageRootProps> = ({ children, pageContext }) => {
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
