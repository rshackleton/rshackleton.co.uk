import PropTypes from 'prop-types';
import React from 'react';
import { atomDark as style } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
  Caption,
  CaptionLink,
  Container,
  SyntaxHighlighter,
} from './SyntaxHighlightedCodeBlock.styles';

const SyntaxHighlightedCodeBlock = ({ code, language, sourceUrl }) => (
  <Container>
    <SyntaxHighlighter
      hasCaption={sourceUrl && sourceUrl.length}
      language={language}
      style={style}
    >
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

SyntaxHighlightedCodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
};

export default SyntaxHighlightedCodeBlock;
