import { css } from '@emotion/core';

import theme from '@utils/theme';
import { rhythm } from '@utils/typography';

export default css`
  html {
    overflow: auto;
  }

  body {
    margin-top: ${rhythm(theme.dimensions.header)};
    background: ${theme.colors.siteBackground};
    color: ${theme.colors.body};
  }
`;
