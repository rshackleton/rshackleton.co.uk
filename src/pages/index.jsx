import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import HomeBanner from '@components/home/HomeBanner';
import Layout from '@components/layouts/Default';
import SEO from '@components/shared/SEO';

const Index = ({
  data: {
    allKenticoCloudItemHomePage: {
      edges: [{ node: data }],
    },
  },
}) => {
  const image = get(data, 'elements.background_image.value[0].url');
  const imageDescription = get(
    data,
    'elements.background_image.value[0].description',
  );

  return (
    <Layout>
      <SEO
        title={data.elements.metadata__page_title.value}
        description={data.elements.metadata__page_description.value}
        keywords={data.elements.metadata__page_keywords.value}
      />
      <HomeBanner image={image} imageDescription={imageDescription} />
    </Layout>
  );
};

export default Index;

export const query = graphql`
  {
    allKenticoCloudItemHomePage {
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
          }
        }
      }
    }
  }
`;

Index.propTypes = {
  data: PropTypes.object,
};
