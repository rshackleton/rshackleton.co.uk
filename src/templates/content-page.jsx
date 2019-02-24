import get from 'lodash/get';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '@components/layouts/InsetWithBanner';
import RichText from '@components/shared/RichText';
import SEO from '@components/shared/SEO';

const ContentPage = ({ data: { kenticoCloudItemContentPage: data } }) => {
  const ogImage = get(data, 'elements.metadata__open_graph_image.value[0]');
  const slug = get(data, 'elements.slug.value');

  const seo = {
    title: get(data, 'elements.metadata__page_title.value'),
    description: get(data, 'elements.metadata__page_description.value'),
    keywords: get(data, 'elements.metadata__page_keywords.value'),
    image: ogImage ? ogImage.url : null,
    imageDescription: ogImage ? ogImage.description : null,
    url: `/${slug}`,
  };

  const banner = get(data, 'elements.banner.value[0].url');
  const bannerDescription = get(data, 'elements.banner.value[0].description');
  const content = get(data, 'elements.body.resolvedHtml');
  const images = get(data, 'elements.body.images');
  const links = get(data, 'elements.body.links');
  const linkedItems = get(data, 'elements.body.linked_items');
  const title = get(data, 'elements.title.value');

  return (
    <Layout banner={banner} bannerDescription={bannerDescription}>
      <SEO {...seo} />
      <h1>{title}</h1>
      <RichText
        content={content}
        images={images}
        links={links}
        linkedItems={linkedItems}
      />
    </Layout>
  );
};

ContentPage.propTypes = {
  data: PropTypes.object,
};

export default ContentPage;

export const query = graphql`
  query($slug: String!) {
    kenticoCloudItemContentPage(elements: { slug: { value: { eq: $slug } } }) {
      id
      elements {
        title {
          value
        }
        slug {
          value
        }
        body {
          resolvedHtml
          images {
            imageId
            description
            url
          }
          links {
            codename
            linkId
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
        metadata__open_graph_image {
          value {
            description
            url
          }
        }
      }
    }
  }
`;
