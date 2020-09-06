import React from 'react';

interface ICodeBlockProps extends CodeBlockViewModel {}

const CodeBlock: React.FC<ICodeBlockProps> = ({ code, sourceUrl, type }) => {
  return <pre>{code}</pre>;
};

export default CodeBlock;
