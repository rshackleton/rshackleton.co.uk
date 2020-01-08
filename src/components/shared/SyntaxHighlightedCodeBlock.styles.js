import { css } from '@emotion/core';
import styled from '@emotion/styled';

import mq from '@utils/mq';
import { adjustFontSizeTo, rhythm } from '@utils/typography';

interface ContainerProps {
  hasCaption: Boolean;
}

export const Container = styled.figure<ContainerProps>`
  margin: 0 ${rhythm(-0.5)} ${rhythm(1)};

  ${mq.sm} {
    margin: 0 ${rhythm(-1)} ${rhythm(1)};
  }

  > pre {
    margin: 0 !important;
    ${({ hasCaption }) =>
      hasCaption
        ? css`
            border-radius: 0.3em 0.3em 0 0 !important;
          `
        : null}
  }
`;

export const Caption = styled.figcaption`
  display: block;
  padding: 0 ${rhythm(0.5)};
  border-radius: 0 0 0.3em 0.3em;
  background: hsl(210, 6%, 82%);
  ${adjustFontSizeTo(12)}

  ${mq.sm} {
    padding: 0 ${rhythm(1)};
  }
`;

export const CaptionLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.colors.body};
  text-decoration: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;
