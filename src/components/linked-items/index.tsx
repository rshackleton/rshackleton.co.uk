import ArticleComponent from '@components/linked-items/Article';
import CodeBlockComponent from '@components/linked-items/CodeBlock';
import ContentPageComponent from '@components/linked-items/ContentPage';
import TweetComponent from '@components/linked-items/Tweet';
import { graphql } from 'gatsby';
import {
  IArticle,
  ICodeBlock,
  IContentPage,
  IKontentItem,
  ITweet,
} from 'index';
import React, { FC } from 'react';

interface ILinkedItemProps {
  linkedItem: IKontentItem;
}

const LinkedItem: FC<ILinkedItemProps> = ({ linkedItem }) => {
  const type = linkedItem.system.type;

  switch (type) {
    case 'article': {
      return <ArticleComponent linkedItem={linkedItem as IArticle} />;
    }

    case 'code_block': {
      return <CodeBlockComponent linkedItem={linkedItem as ICodeBlock} />;
    }

    case 'content_page': {
      return <ContentPageComponent linkedItem={linkedItem as IContentPage} />;
    }

    case 'tweet': {
      return <TweetComponent linkedItem={linkedItem as ITweet} />;
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
