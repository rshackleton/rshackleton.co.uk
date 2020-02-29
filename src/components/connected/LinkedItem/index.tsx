import { graphql } from 'gatsby';
import React, { FC } from 'react';

import ArticleComponent from '@components/connected/Article';
import CodeBlockComponent from '@components/connected/CodeBlock';
import ContentPageComponent from '@components/connected/ContentPage';
import TweetComponent from '@components/connected/Tweet';

import { ILinkedItemProps, LinkedItemType } from './LinkedItem.types';

const LinkedItem: FC<ILinkedItemProps> = ({ linkedItem }) => {
  const type = linkedItem.system.type;

  switch (type) {
    case LinkedItemType.Article: {
      return <ArticleComponent linkedItem={linkedItem} />;
    }

    case LinkedItemType.CodeBlock: {
      return <CodeBlockComponent linkedItem={linkedItem} />;
    }

    case LinkedItemType.ContentPage: {
      return <ContentPageComponent linkedItem={linkedItem} />;
    }

    case LinkedItemType.Tweet: {
      return <TweetComponent linkedItem={linkedItem} />;
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
