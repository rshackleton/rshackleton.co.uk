import React, { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as style } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
  Caption,
  CaptionLink,
  Container,
} from './SyntaxHighlightedCodeBlock.styles';

interface SyntaxHighlightedCodeBlockProps {
  code: string;
  language: string;
  sourceUrl?: string;
}

const SyntaxHighlightedCodeBlock: FC<SyntaxHighlightedCodeBlockProps> = ({
  code,
  language,
  sourceUrl,
}) => (
  <Container hasCaption={!!(sourceUrl && sourceUrl.length)}>
    <SyntaxHighlighter language={language} style={style}>
      {code}
    </SyntaxHighlighter>
    {sourceUrl && sourceUrl.length ? (
      <Caption>
        <CaptionLink
          href={sourceUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          View Source
        </CaptionLink>
      </Caption>
    ) : null}
  </Container>
);

export default SyntaxHighlightedCodeBlock;
