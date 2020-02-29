import styled from '@utils/styled';
import { adjustFontSizeTo, rhythm } from '@utils/typography';
import { Link as LinkBase } from 'gatsby';

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

export const Link = styled(LinkBase)`
  display: block;
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.headerFontFamily};
  ${{ ...adjustFontSizeTo(18) }};
  font-weight: normal;
  text-decoration: none;
`;
