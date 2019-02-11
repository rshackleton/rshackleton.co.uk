import { Global } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Footer from '@components/shared/Footer';
import Header from '@components/shared/Header';
import ThemeWrapper from '@components/shared/ThemeWrapper';
import globalStyles from '@utils/globalStyles';

import {
  Banner,
  ContainerInset,
  ContentWrapper,
} from './InsetWithBanner.styles';

const Layout = ({ banner, bannerDescription, children }) => (
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
        <ContentWrapper>
          <Banner image={banner} imageDescription={bannerDescription} />
          <ContainerInset>{children}</ContainerInset>
        </ContentWrapper>
        <Footer />
      </ThemeWrapper>
    )}
  />
);

Layout.propTypes = {
  banner: PropTypes.string.isRequired,
  bannerDescription: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
