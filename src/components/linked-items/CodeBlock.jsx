import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import SyntaxHighlightedCodeBlock from '@components/shared/SyntaxHighlightedCodeBlock';

const CodeBlock = ({ linkedItem }) => {
  const props = {
    code: get(linkedItem, 'elements.code.value'),
    language: get(linkedItem, 'elements.language.value'),
  };

  return <SyntaxHighlightedCodeBlock {...props} />;
};

CodeBlock.propTypes = {
  linkedItem: PropTypes.object.isRequired,
};

export default CodeBlock;

export const KenticoCloudItemCodeBlockFragment = graphql`
  fragment KenticoCloudItemCodeBlockFragment on KenticoCloudItemCodeBlock {
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
    }
  }
`;
