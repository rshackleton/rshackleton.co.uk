import { Global } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';
import React, { ReactNode } from 'react';

import SearchModal, {
  SearchModalProvider,
} from '@components/search/SearchModal';

import Footer from '@components/shared/Footer';
import Header from '@components/shared/Header';
import ThemeWrapper from '@components/shared/ThemeWrapper';
import globalStyles from '@utils/globalStyles';

interface IPageRootProps {
  children: ReactNode;
}

const PageRoot: React.FC<IPageRootProps> = ({ children }) => {
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
      <SearchModalProvider>
        <SearchModal />
        <Global styles={globalStyles} />
        <Header siteTitle={data.site.siteMetadata.title} />
        {children}
        <Footer />
      </SearchModalProvider>
    </ThemeWrapper>
  );
};

export default PageRoot;
