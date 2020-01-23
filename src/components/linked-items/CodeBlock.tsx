import { CodeBlock } from 'index';

import { graphql } from 'gatsby';
import React, { FC } from 'react';

import SyntaxHighlightedCodeBlock from '@components/shared/SyntaxHighlightedCodeBlock';

interface CodeBlockProps {
  linkedItem: CodeBlock;
}

const CodeBlockComponent: FC<CodeBlockProps> = ({ linkedItem }) => {
  const props = {
    code: linkedItem.elements.code.value || '',
    language: linkedItem.elements.language.value || '',
    sourceUrl: linkedItem.elements.source_url.value || '',
  };

  return <SyntaxHighlightedCodeBlock {...props} />;
};

export default CodeBlockComponent;

export const KontentItemCodeBlockFragment = graphql`
  fragment KontentItemCodeBlockFragment on KontentItemCodeBlock {
    system {
      codename
      type
    }
    elements {
      code {
        value
      }
      language {
        value
      }
      source_url {
        value
      }
    }
  }
`;
