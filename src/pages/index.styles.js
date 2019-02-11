import styled from '@emotion/styled';

import PictureBase from '@components/shared/Picture';
import SiteWideBase from '@components/shared/SiteWide';
import { adjustFontSizeTo, rhythm } from '@utils/typography';

export const Banner = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  position: relative;
  height: ${({ theme }) =>
    `calc(100vh - ${rhythm(
      theme.dimensions.header + theme.dimensions.footer,
    )})`};
`;

export const Content = styled(SiteWideBase)`
  position: relative;
  display: block;
  padding-top: ${rhythm(10)};
`;

export const Picture = styled(PictureBase)`
  display: block;

  @supports (object-fit: cover) {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const TagLine = styled.h2`
  display: inline-block;
  background: ${({ theme }) => theme.colors.siteBackground};
  ${adjustFontSizeTo(24)}
  font-weight: normal;
`;

export const Title = styled.h1`
  display: inline-block;
  margin-bottom: ${rhythm(0.5)};
  background: ${({ theme }) => theme.colors.siteBackground};
  ${adjustFontSizeTo(42)}
  font-weight: normal;
`;
