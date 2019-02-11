import { Global } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Footer from '@components/shared/Footer';
import Header from '@components/shared/Header';
import ThemeWrapper from '@components/shared/ThemeWrapper';
import globalStyles from '@utils/globalStyles';

import { ContentWrapper } from './Default.styles';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeWrapper>
        <Global styles={globalStyles} />
        <Header siteTitle={data.site.siteMetadata.title} />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer />
      </ThemeWrapper>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
