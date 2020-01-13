import { graphql } from 'gatsby';
import React, { FC } from 'react';

import HomeBanner from '@components/home/HomeBanner';
import Layout from '@components/layouts/Default';
import SEO from '@components/shared/SEO';

interface IndexProps {
  data: {
    allKontentItemHomePage: Connection<HomePage>;
  };
}

const Index: FC<IndexProps> = ({
  data: {
    allKontentItemHomePage: {
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

  const image = data.elements.background_image.value[0].url;
  const imageDescription = data.elements.background_image.value[0].description;

  return (
    <Layout>
      <SEO {...seo} />
      <HomeBanner image={image} imageDescription={imageDescription} />
    </Layout>
  );
};

export default Index;

export const query = graphql`
  {
    allKontentItemHomePage {
      edges {
        node {
          id
          elements {
            background_image {
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
  }
`;
