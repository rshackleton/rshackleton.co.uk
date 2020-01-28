import styled from '@utils/styled';
import { rhythm } from '@utils/typography';
import GatsbyImage from 'gatsby-image';

export const Container = styled.div`
  position: relative;
  display: block;
  height: ${({ theme }) => rhythm(theme.dimensions.banner)};
  z-index: ${({ theme }) => theme.layers.base};
`;

export const Img = styled(GatsbyImage)`
  display: block;
  height: 100%;
  width: 100%;
`;
