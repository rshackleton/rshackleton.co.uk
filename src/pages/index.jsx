import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '@components/layouts/Default';
import { Source } from '@components/shared/Picture';
import SEO from '@components/shared/SEO';
import { rules } from '@utils/mq';

import {
  Banner,
  Container,
  Content,
  Picture,
  TagLine,
  Title,
} from './index.styles';

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

  const srcs = {
    xl: `${image}?w=1920&auto=format 1x, ${image}?w=3840&auto=format 2x`,
    lg: `${image}?w=1200&auto=format 1x, ${image}?w=2400&auto=format 2x`,
    md: `${image}?w=992&auto=format 1x, ${image}?w=1984&auto=format 2x`,
    sm: `${image}?w=768&auto=format 1x, ${image}?w=1536&auto=format 2x`,
    xs: `${image}?w=576&auto=format 1x, ${image}?w=1152&auto=format 2x`,
  };

  return (
    <Layout>
      <SEO
        title={data.elements.metadata__page_title.value}
        description={data.elements.metadata__page_description.value}
        keywords={data.elements.metadata__page_keywords.value}
      />
      <Container>
        <Banner>
          <Picture
            alt={imageDescription}
            fallback={`${image}?w=320&auto=format 1x, ${image}?w=640&auto=format 2x`}
            sources={Object.entries(srcs).map(([key, src]) => {
              const rule = rules[key];
              return <Source key={key} srcSet={src} media={rule} />;
            })}
          />
        </Banner>
        <Content>
          <Title>Richard Shackleton</Title>
          <br />
          <TagLine>Web developer</TagLine>
        </Content>
      </Container>
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
