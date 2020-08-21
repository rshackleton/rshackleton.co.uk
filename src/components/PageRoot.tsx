import { Global } from '@emotion/core';
import KontentSmartLink from '@kentico/kontent-smart-link';
import '@kentico/kontent-smart-link/dist/kontent-smart-link.styles.css';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, ReactNode } from 'react';

import ThemeWrapper from '@components/connected/ThemeWrapper';

import Footer from '@components/presentation/Footer';
import Header from '@components/presentation/Header';

import SearchModal, { SearchModalProvider } from '@components/search/SearchModal';

import globalStyles from '@utils/globalStyles';

import { PageContext, PageContextProvider } from './PageContext';
import Helmet from 'react-helmet';

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

  useEffect(() => {
    const kontentSmartLink = KontentSmartLink.initialize({
      queryParam: 'preview-mode',
    });
    return () => {
      kontentSmartLink.destroy();
    };
  });

  return (
    <>
      <Helmet
        bodyAttributes={{
          'data-kontent-project-id': process.env.GATSBY_KC_PROJECT_ID,
          'data-kontent-language-codename': process.env.GATSBY_KC_LANGUAGE_CODENAME,
        }}
      />
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
    </>
  );
};

export default PageRoot;
