import styled from '@utils/styled';
import { rhythm } from '@utils/typography';
import GatsbyImage from 'gatsby-image';

export const Image = styled(GatsbyImage)`
  display: block;
  margin-bottom: ${rhythm(1)};
`;
