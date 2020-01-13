import styled from '@emotion/styled';

import PictureBase from '@components/shared/Picture';
import { rhythm } from '@utils/typography';
import { Theme } from '@utils/theme';

export const Container = styled.div<{ theme: Theme }>`
  position: relative;
  display: block;
  height: ${({ theme }) => rhythm(theme.dimensions.banner)};
  z-index: ${({ theme }) => theme.layers.base};
`;

export const Picture = styled(PictureBase)`
  display: block;

  @supports (object-fit: cover) {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
