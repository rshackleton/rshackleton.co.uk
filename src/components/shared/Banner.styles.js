import styled from '@emotion/styled';
import { rgba } from 'polished';

import PictureBase from '@components/shared/Picture';
import { rhythm } from '@utils/typography';

export const Container = styled.div`
  position: relative;
  display: block;
  height: ${rhythm(18)};
  z-index: ${({ theme }) => theme.layers.base};

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({ theme }) => getFadeOut(theme.colors.siteBackground)};
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

/** Get fade out linear gradient. */
function getFadeOut(color) {
  const start = rgba(color, 0);
  const end = rgba(color, 1);
  return `linear-gradient(to bottom, ${start} 60%, ${end} 100%)`;
}
