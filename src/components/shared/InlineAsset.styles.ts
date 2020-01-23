import GatsbyImage from 'gatsby-image';

import styled from '@utils/styled';
import { rhythm } from '@utils/typography';

export const Image = styled(GatsbyImage)`
  display: block;
  margin-bottom: ${rhythm(1)};
`;
