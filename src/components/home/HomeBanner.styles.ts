import GatsbyImage from 'gatsby-image';

import mq from '@utils/mq';
import styled from '@utils/styled';
import { adjustFontSizeTo, rhythm } from '@utils/typography';

export const Banner = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
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

export const Content = styled.div`
  position: relative;
  display: block;
  width: ${({ theme }) => theme.container.base};
  margin: 0 auto;
  padding: 0 ${rhythm(1)};

  ${mq.sm} {
    margin-top: ${rhythm(10)};
  }
`;

export const Img = styled(GatsbyImage)`
  display: block;
  height: 100%;
  width: 100%;
`;

export const TagLine = styled.h2`
  display: inline-block;
  margin-bottom: 0;
  ${{ ...adjustFontSizeTo(24) }}
  font-weight: normal;

  > span {
    display: inline;
    background: ${({ theme }) => theme.colors.siteBackground};
  }
`;

export const Title = styled.h1`
  display: inline-block;
  margin-bottom: ${rhythm(0.5)};
  ${{ ...adjustFontSizeTo(42) }}
  font-weight: normal;

  > span {
    display: inline;
    background: ${({ theme }) => theme.colors.siteBackground};
  }
`;
