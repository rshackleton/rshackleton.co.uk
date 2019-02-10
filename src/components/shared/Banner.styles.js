import styled from '@emotion/styled';

import PictureBase from '@components/shared/Picture';
import { rhythm } from '@utils/typography';

export const Container = styled.div`
  position: relative;
  display: block;
  height: ${rhythm(18)};
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
