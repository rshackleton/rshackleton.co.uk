import { graphql } from 'gatsby';
import { Schema } from 'schema';
import React, { FC } from 'react';

import ArticleList from '@components/presentation/ArticleList';
import Layout from '@components/layouts/InsetWithBanner';
import SearchModal from '@components/search/SearchModal';
import SEO from '@components/connected/SEO';

interface IArticlesProps {
  data: {
    allKontentItemArticle: Schema.IConnection<Schema.IArticle>;
    allKontentItemArticleListing: Schema.IConnection<Schema.IArticleListing>;
  };
}

const Articles: FC<IArticlesProps> = ({
  data: {
    allKontentItemArticleListing: {
      edges: [{ node: data }],
    },
    allKontentItemArticle: { edges: itemsData },
  },
}) => {
  const ogImage = data.elements.metadata__open_graph_image.value[0];

  const seo = {
    title: data.elements.metadata__page_title.value,
    description: data.elements.metadata__page_description.value,
    keywords: data.elements.metadata__page_keywords.value,
    image: ogImage ? ogImage.url : null,
    imageDescription: ogImage ? ogImage.description : null,
    url: `/articles`,
  };

  const banner = data.elements.banner.value[0].fluid;
  const bannerDescription = data.elements.banner.value[0].description;

  const title = data.elements.title.value;

  const items = itemsData.map(({ node: item }) => ({
    id: item.system.id,
    codename: item.system.codename,
    slug: item.elements.slug.value || '',
    summary: item.elements.summary.value || '',
    title: item.elements.title.value || '',
  }));

  return (
    <Layout banner={banner} bannerDescription={bannerDescription}>
      <SEO {...seo} />
      <h1>{title}</h1>
      <SearchModal />
      <ArticleList items={items} />
    </Layout>
  );
};

export default Articles;

export const query = graphql`
  query Articles {
    allKontentItemArticleListing(limit: 1) {
      edges {
        node {
          elements {
            title {
              value
            }
            banner {
              value {
                description
                fluid(maxWidth: 1920) {
                  ...KontentAssetFluid_withWebp
                }
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
            metadata__open_graph_image {
              value {
                description
                url
              }
            }
          }
        }
      }
    }
    allKontentItemArticle(limit: 1000, sort: { fields: elements___date___value, order: DESC }) {
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
