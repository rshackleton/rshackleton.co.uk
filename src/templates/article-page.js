import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ArticlePage = ({ data: { kenticoCloudItemArticle: data } }) => {
  return (
    <Layout>
      <SEO
        title={data.elements.metadata__page_title.value}
        description={data.elements.metadata__page_description.value}
        keywords={data.elements.metadata__page_keywords.value}
      />
      <div>
        <h1>{data.elements.title.value}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.elements.body.value }} />
      </div>
    </Layout>
  );
};

export default ArticlePage;

export const query = graphql`
  query($slug: String!) {
    kenticoCloudItemArticle(elements: { slug: { value: { eq: $slug } } }) {
      id
      elements {
        title {
          value
        }
        body {
          value
        }
        metadata__page_title {
          value
        }
        metadata__page_description {
          value
        }
        metadata__page_keywords {
          value
        }
      }
    }
  }
`;

ArticlePage.propTypes = {
  data: PropTypes.object,
};
