import styled from '@emotion/styled';
import { Link as LinkBase } from 'gatsby';

import { adjustFontSizeTo, rhythm } from '@utils/typography';
import { Theme } from '@utils/theme';

export const Container = styled.nav`
  display: block;
  margin-left: auto;
`;

export const Links = styled.ul`
  display: block;
  margin: 0;
  list-style: none;
`;

export const LinkItem = styled.li`
  display: inline-block;
  margin: 0;

  & + & {
    margin-left: ${rhythm(1)};
  }
`;

export const Link = styled(LinkBase)<{ theme: Theme }>`
  display: block;
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.headerFontFamily};
  ${{ ...adjustFontSizeTo(18) }};
  font-weight: normal;
  text-decoration: none;
`;
