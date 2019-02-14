import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '@components/layouts/InsetWithBanner';
import RichText from '@components/shared/RichText';
import SEO from '@components/shared/SEO';

const ArticlePage = ({ data: { kenticoCloudItemArticle: data } }) => {
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
      <RichText
        content={data.elements.body.resolvedHtml}
        images={data.elements.body.images}
        links={data.elements.body.links}
        linkedItems={data.elements.body.linked_items}
      />
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
          resolvedHtml
          images {
            image_id
            description
            url
          }
          links {
            codename
            itemId
            type
            urlSlug
          }
          linked_items {
            ...LinkedItemsFragment
          }
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
`;

ArticlePage.propTypes = {
  data: PropTypes.object,
};
