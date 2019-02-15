import get from 'lodash/get';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import ArticleList from '@components/articles/ArticleList';
import Layout from '@components/layouts/InsetWithBanner';
import SEO from '@components/shared/SEO';

const Articles = ({
  data: {
    allKenticoCloudItemArticleListing: {
      edges: [{ node: data }],
    },
    allKenticoCloudItemArticle: { edges: itemsData },
  },
}) => {
  const seo = {
    title: get(data, 'elements.metadata__page_title.value'),
    description: get(data, 'elements.metadata__page_description.value'),
    keywords: get(data, 'elements.metadata__page_keywords.value'),
  };

  const banner = get(data, 'elements.banner.value[0].url');
  const bannerDescription = get(data, 'elements.banner.value[0].description');
  const title = get(data, 'elements.title.value');

  const items = itemsData.map(({ node: item }) => ({
    id: get(item, 'system.id'),
    codename: get(item, 'system.codename'),
    slug: get(item, 'elements.slug.value'),
    summary: get(item, 'elements.summary.value'),
    title: get(item, 'elements.title.value'),
  }));

  return (
    <Layout banner={banner} bannerDescription={bannerDescription}>
      <SEO {...seo} />
      <h1>{title}</h1>
      <ArticleList items={items} />
    </Layout>
  );
};

Articles.propTypes = {
  data: PropTypes.object,
};

export default Articles;

export const query = graphql`
  {
    allKenticoCloudItemArticleListing(limit: 1) {
      edges {
        node {
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
          system {
            codename
            id
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
      }
    }
  }
`;
