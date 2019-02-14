import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { adjustFontSizeTo, rhythm } from '@utils/typography';

export const Container = styled(Link)`
  display: block;
  padding: ${rhythm(1)};
  margin: 0 0 ${rhythm(1)};
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.02);
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
`;

export const Summary = styled.p`
  display: block;
  margin: 0;
  ${adjustFontSizeTo(14)};
`;

export const Title = styled.h3`
  display: block;
  margin: 0 0 ${rhythm(0.5)};
  ${adjustFontSizeTo(20)};
`;
