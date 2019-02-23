import PropTypes from 'prop-types';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
