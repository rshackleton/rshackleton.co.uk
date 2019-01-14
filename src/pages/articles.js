import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Index = ({
  data: {
    allKenticoCloudItemArticle: { edges },
  },
}) => {
  return (
    <Layout>
      <SEO title="Articles" description="" keywords="" />
      <div>
        {edges.map(({ node }) => (
          <article key={node.id}>
            <h2>
              <Link to={`articles/${node.elements.slug.value}`}>
                {node.elements.title.value}
              </Link>
            </h2>
            <p>{node.elements.summary.value}</p>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  {
    allKenticoCloudItemArticle(limit: 1000) {
      edges {
        node {
          id
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
      }
    }
  }
`;

Index.propTypes = {
  data: PropTypes.object,
};
