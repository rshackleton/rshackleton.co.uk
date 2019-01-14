import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Index = ({
  data: {
    allKenticoCloudItemHomePage: {
      edges: [{ node: data }],
    },
  },
}) => {
  return (
    <Layout>
      <SEO
        title={data.elements.metadata__page_title.value}
        description={data.elements.metadata__page_description.value}
        keywords={data.elements.metadata__page_keywords.value}
      />
      <div>
        <ul>
          <li>
            <Link to="articles">Articles</Link>
          </li>
        </ul>
      </div>
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
