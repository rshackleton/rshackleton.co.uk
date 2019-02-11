import styled from '@emotion/styled';

import { rhythm } from '@utils/typography';

export const Outer = styled.div`
  display: block;
  width: 100%;
`;

export const Inner = styled.div`
  position: relative;
  display: block;
  margin: ${rhythm(-4)} auto 0;
  min-height: ${rhythm(10)};
  max-width: ${({ theme }) => theme.container.text};
  padding: ${rhythm(2)};
  background: ${({ theme }) => theme.colors.insetBackground};
  z-index: ${({ theme }) => theme.layers.content};
`;
