import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import ArticleSummary from '@components/shared/ArticleSummary';

const Article = ({ linkedItem }) => {
  const props = {
    slug: get(linkedItem, 'elements.slug.value'),
    summary: get(linkedItem, 'elements.summary.value'),
    title: get(linkedItem, 'elements.title.value'),
  };

  return <ArticleSummary {...props} />;
};

Article.propTypes = {
  linkedItem: PropTypes.object.isRequired,
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
