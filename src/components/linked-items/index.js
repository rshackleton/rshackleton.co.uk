import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import Article from '@components/linked-items/Article';
import CodeBlock from '@components/linked-items/CodeBlock';
import ContentPage from '@components/linked-items/ContentPage';
import Tweet from '@components/linked-items/Tweet';

const LinkedItem = ({ linkedItem }) => {
  const type = get(linkedItem, 'system.type');

  switch (type) {
    case 'article': {
      return <Article linkedItem={linkedItem} />;
    }

    case 'code_block': {
      return <CodeBlock linkedItem={linkedItem} />;
    }

    case 'content_page': {
      return <ContentPage linkedItem={linkedItem} />;
    }

    case 'tweet': {
      return <Tweet linkedItem={linkedItem} />;
    }

    default:
      return null;
  }
};

LinkedItem.propTypes = {
  linkedItem: PropTypes.shape({
    system: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
};

export default LinkedItem;

export const LinkedItemsFragment = graphql`
  fragment LinkedItemsFragment on Node {
    ... on KontentItemArticle {
      ...KontentItemArticleFragment
    }
    ... on KontentItemCodeBlock {
      ...KontentItemCodeBlockFragment
    }
    ... on KontentItemContentPage {
      ...KontentItemContentPageFragment
    }
    ... on KontentItemTweet {
      ...KontentItemTweetFragment
    }
  }
`;
