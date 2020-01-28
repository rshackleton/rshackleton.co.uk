import SyntaxHighlightedCodeBlock from '@components/shared/SyntaxHighlightedCodeBlock';
import { graphql } from 'gatsby';
import { ICodeBlock } from 'index';
import React, { FC } from 'react';

interface ICodeBlockProps {
  linkedItem: ICodeBlock;
}

const CodeBlockComponent: FC<ICodeBlockProps> = ({ linkedItem }) => {
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
