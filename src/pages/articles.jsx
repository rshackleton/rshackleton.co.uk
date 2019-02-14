import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '@components/layouts/InsetWithBanner';
import SEO from '@components/shared/SEO';

const Index = ({
  data: {
    allKenticoCloudItemArticleListing: {
      edges: [{ node: data }],
    },
    allKenticoCloudItemArticle: { edges: items },
  },
}) => {
  return (
    <Layout
      banner={data.elements.banner.value[0].url}
      bannerDescription={data.elements.banner.value[0].description}
    >
      <SEO
        title={data.elements.metadata__page_title.value}
        description={data.elements.metadata__page_description.value}
        keywords={data.elements.metadata__page_keywords.value}
      />
      <h1>{data.elements.title.value}</h1>
      <div>
        {items.map(({ node }) => (
          <article key={node.id}>
            <h2>
              <Link to={`/articles/${node.elements.slug.value}`}>
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
    allKenticoCloudItemArticleListing(limit: 1) {
      edges {
        node {
          id
          elements {
            title {
              value
            }
            banner {
              value {
                description
                url
              }
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
    }
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
