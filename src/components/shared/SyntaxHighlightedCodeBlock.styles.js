import styled from '@emotion/styled';
import { Prism as SyntaxHighlighterBase } from 'react-syntax-highlighter';

import { rhythm } from '@utils/typography';

export const SyntaxHighlighter = styled(SyntaxHighlighterBase)`
  margin: 0 0 ${rhythm(1)} !important;
`;
