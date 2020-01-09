import styled from '@emotion/styled';

import mq from '@utils/mq';
import { rhythm } from '@utils/typography';
import { Theme } from '@utils/theme';

export const Outer = styled.div`
  display: block;
  width: 100%;
`;

export const Inner = styled.div<{ theme: Theme }>`
  position: relative;
  display: block;
  margin: ${rhythm(-4)} auto 0;
  min-height: ${rhythm(10)};
  max-width: ${({ theme }) => theme.container.text};
  padding: ${rhythm(1)};
  background: ${({ theme }) => theme.colors.insetBackground};
  z-index: ${({ theme }) => theme.layers.content};

  ${mq.sm} {
    padding: ${rhythm(2)};
  }
`;
