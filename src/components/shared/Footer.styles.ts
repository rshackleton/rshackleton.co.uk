import SiteWideBase from '@components/shared/SiteWide';
import styled from '@utils/styled';
import { adjustFontSizeTo, rhythm } from '@utils/typography';

export const Container = styled.footer`
  display: block;
  height: ${({ theme }) => rhythm(theme.dimensions.footer)};
  width: 100%;
  background: ${({ theme }) => theme.colors.siteBackground};
`;

export const SiteWide = styled(SiteWideBase)`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Legal = styled.span`
  margin: 0;
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.headerFontFamily};
  ${{ ...adjustFontSizeTo(14) }};
  font-weight: normal;
`;
