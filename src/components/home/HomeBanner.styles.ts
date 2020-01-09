import styled from '@emotion/styled';

import PictureBase from '@components/shared/Picture';
import mq from '@utils/mq';
import { adjustFontSizeTo, rhythm } from '@utils/typography';
import { Theme } from '@utils/theme';

export const Banner = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{ theme: Theme }>`
  position: relative;
  display: flex;
  height: ${({ theme }) =>
    `calc(100vh - ${rhythm(
      theme.dimensions.header + theme.dimensions.footer,
    )})`};
  align-items: center;

  ${mq.sm} {
    align-items: flex-start;
  }
`;

export const Content = styled.div<{ theme: Theme }>`
  position: relative;
  display: block;
  width: ${({ theme }) => theme.container.base};
  margin: 0 auto;
  padding: 0 ${rhythm(1)};

  ${mq.sm} {
    margin-top: ${rhythm(10)};
  }
`;

export const Picture = styled(PictureBase)`
  display: block;

  @supports (object-fit: cover) {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const TagLine = styled.h2<{ theme: Theme }>`
  display: inline-block;
  margin-bottom: 0;
  ${{ ...adjustFontSizeTo(24) }}
  font-weight: normal;

  > span {
    display: inline;
    background: ${({ theme }) => theme.colors.siteBackground};
  }
`;

export const Title = styled.h1<{ theme: Theme }>`
  display: inline-block;
  margin-bottom: ${rhythm(0.5)};
  ${{ ...adjustFontSizeTo(42) }}
  font-weight: normal;

  > span {
    display: inline;
    background: ${({ theme }) => theme.colors.siteBackground};
  }
`;
