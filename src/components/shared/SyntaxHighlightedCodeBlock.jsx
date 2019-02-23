import PropTypes from 'prop-types';
import React from 'react';
import { atomDark as style } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { SyntaxHighlighter } from './SyntaxHighlightedCodeBlock.styles';

const SyntaxHighlightedCodeBlock = ({ code, language }) => (
  <SyntaxHighlighter language={language} style={style}>
    {code}
  </SyntaxHighlighter>
);

SyntaxHighlightedCodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default SyntaxHighlightedCodeBlock;
