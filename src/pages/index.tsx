import { graphql } from 'gatsby';
import React, { FC } from 'react';
import { Schema } from 'schema';

import Layout from '@components/layouts/Default';
import HomeBanner from '@components/presentation/HomeBanner';
import SEO from '@components/connected/SEO';

interface IIndexProps {
  data: {
    allKontentItemHomepage: Schema.IConnection<Schema.IHomepage>;
  };
}

const Index: FC<IIndexProps> = ({
  data: {
    allKontentItemHomepage: {
      edges: [{ node: data }],
    },
  },
}) => {
  const ogImage = data.elements.metadata__open_graph_image.value[0];

  const seo = {
    title: data.elements.metadata__page_title.value,
    description: data.elements.metadata__page_description.value,
    keywords: data.elements.metadata__page_keywords.value,
    image: ogImage.url,
    imageDescription: ogImage.description,
    url: '/',
  };

  const image = data.elements.background_image.value[0].fluid;
  const imageDescription = data.elements.background_image.value[0].description;

  return (
    <Layout contentItemId={data.system.id}>
      <SEO {...seo} />
      <HomeBanner image={image} imageDescription={imageDescription} data-kontent-element-codename="background_image" />
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query Home {
    allKontentItemHomepage {
      edges {
        node {
          id
          elements {
            background_image {
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
          system {
            id
          }
        }
      }
    }
  }
`;
