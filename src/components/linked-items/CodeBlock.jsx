import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import SyntaxHighlightedCodeBlock from '@components/shared/SyntaxHighlightedCodeBlock';

const CodeBlock = ({ linkedItem }) => {
  const props = {
    code: get(linkedItem, 'elements.code.value'),
    language: get(linkedItem, 'elements.language.value'),
    sourceUrl: get(linkedItem, 'elements.source_url.value'),
  };

  return <SyntaxHighlightedCodeBlock {...props} />;
};

CodeBlock.propTypes = {
  linkedItem: PropTypes.object.isRequired,
};

export default CodeBlock;

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
