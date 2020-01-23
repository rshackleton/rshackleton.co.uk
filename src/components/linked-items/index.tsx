import { KontentItem, Article, CodeBlock, ContentPage, Tweet } from 'index';

import { graphql } from 'gatsby';
import React, { FC } from 'react';

import ArticleComponent from '@components/linked-items/Article';
import CodeBlockComponent from '@components/linked-items/CodeBlock';
import ContentPageComponent from '@components/linked-items/ContentPage';
import TweetComponent from '@components/linked-items/Tweet';

interface LinkedItemProps {
  linkedItem: KontentItem;
}

const LinkedItem: FC<LinkedItemProps> = ({ linkedItem }) => {
  const type = linkedItem.system.type;

  switch (type) {
    case 'article': {
      return <ArticleComponent linkedItem={linkedItem as Article} />;
    }

    case 'code_block': {
      return <CodeBlockComponent linkedItem={linkedItem as CodeBlock} />;
    }

    case 'content_page': {
      return <ContentPageComponent linkedItem={linkedItem as ContentPage} />;
    }

    case 'tweet': {
      return <TweetComponent linkedItem={linkedItem as Tweet} />;
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
