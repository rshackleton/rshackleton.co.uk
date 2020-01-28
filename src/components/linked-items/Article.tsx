import ArticleSummary from '@components/shared/ArticleSummary';
import { graphql } from 'gatsby';
import { IArticle } from 'index';
import React, { FC } from 'react';

interface IArticleProps {
  linkedItem: IArticle;
}

const ArticleComponent: FC<IArticleProps> = ({ linkedItem }) => {
  const props = {
    slug: linkedItem.elements.slug.value || '',
    summary: linkedItem.elements.summary.value || '',
    title: linkedItem.elements.title.value || '',
  };

  return <ArticleSummary {...props} />;
};

export default ArticleComponent;

export const KontentItemArticleFragment = graphql`
  fragment KontentItemArticleFragment on KontentItemArticle {
    system {
      codename
      type
    }
    elements {
      title {
        value
      }
      slug {
        value
      }
      summary {
        value
      }
    }
  }
`;
