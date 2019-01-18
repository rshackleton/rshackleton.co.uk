/** @jsx jsx */
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css, jsx } from '@emotion/core';

import { rhythm } from '../utils/typography';

const Header = ({ siteTitle }) => (
  <div
    css={css`
      background: rebeccapurple;
      margin-bottom: ${rhythm(1)};
    `}
  >
    <div
      css={css`
        margin: 0 auto;
        max-width: 960px;
        padding: ${rhythm(1)} ${rhythm(1)};
      `}
    >
      <h1
        css={css`
          margin: 0;
        `}
      >
        <Link
          to="/"
          css={css`
            color: white;
            text-decoration: none;
          `}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

export default Header;
