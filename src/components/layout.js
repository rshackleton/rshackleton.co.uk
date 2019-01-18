/** @jsx jsx */
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { css, jsx } from '@emotion/core';

import { rhythm } from '../utils/typography';
import Header from '../components/header';

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
      <div>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          css={css`
            margin: 0 auto;
            max-width: 960px;
            padding: 0 ${rhythm(1)} ${rhythm(1)};
            padding-top: 0;
          `}
        >
          {children}
        </div>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
