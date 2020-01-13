import { graphql } from 'gatsby';
import React, { FC } from 'react';

import ArticleSummary from '@components/shared/ArticleSummary';

interface ArticleProps {
  linkedItem: Article;
}

const Article: FC<ArticleProps> = ({ linkedItem }) => {
  const props = {
    slug: linkedItem.elements.slug.value,
    summary: linkedItem.elements.summary.value,
    title: linkedItem.elements.title.value,
  };

  return <ArticleSummary {...props} />;
};

export default Article;

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
