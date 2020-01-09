import styled from '@emotion/styled';

import { rhythm } from '@utils/typography';

export const Container = styled.footer``;

export const Tag = styled.small`
  display: inline-block;

  & + & {
    &::before {
      content: '—';
      display: inline-block;
      margin: 0 ${rhythm(0.25)};
    }
  }
`;
