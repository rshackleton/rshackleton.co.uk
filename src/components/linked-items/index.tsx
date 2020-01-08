import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Article from '@components/linked-items/Article';
import CodeBlock from '@components/linked-items/CodeBlock';
import ContentPage from '@components/linked-items/ContentPage';
import Tweet from '@components/linked-items/Tweet';

interface LinkedItemProps {
  linkedItem: KontentItem;
}

const LinkedItem: FC<LinkedItemProps> = ({ linkedItem }) => {
  const type = linkedItem.system.type;

  switch (type) {
    case 'article': {
      return <Article linkedItem={linkedItem as Article} />;
    }

    case 'code_block': {
      return <CodeBlock linkedItem={linkedItem as CodeBlock} />;
    }

    case 'content_page': {
      return <ContentPage linkedItem={linkedItem as ContentPage} />;
    }

    case 'tweet': {
      return <Tweet linkedItem={linkedItem as Tweet} />;
    }

    default:
      return null;
  }
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
