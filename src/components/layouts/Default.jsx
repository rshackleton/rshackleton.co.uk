import { Global } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Footer from '@components/shared/Footer';
import Header from '@components/shared/Header';
import ThemeWrapper from '@components/shared/ThemeWrapper';
import globalStyles from '@utils/globalStyles';

import { ContentWrapper } from './Default.styles';

const Layout = ({ children }) => {
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

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
