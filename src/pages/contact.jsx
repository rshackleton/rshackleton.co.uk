import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '@components/layouts/InsetWithBanner';
import RichText from '@components/shared/RichText';
import SEO from '@components/shared/SEO';
import ContactForm from '../components/forms/ContactForm';

const Contact = ({
  data: {
    allKontentItemContactPage: {
      edges: [{ node: data }],
    },
  },
}) => {
  const ogImage = get(data, 'elements.metadata__open_graph_image.value[0]');

  const seo = {
    title: get(data, 'elements.metadata__page_title.value'),
    description: get(data, 'elements.metadata__page_description.value'),
    keywords: get(data, 'elements.metadata__page_keywords.value'),
    image: ogImage ? ogImage.url : null,
    imageDescription: ogImage ? ogImage.description : null,
    url: `/contact`,
  };

  const banner = get(data, 'elements.banner.value[0].url');
  const bannerDescription = get(data, 'elements.banner.value[0].description');
  const content = get(data, 'elements.body.resolvedData.html');
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
      <ContactForm />
    </Layout>
  );
};

Contact.propTypes = {
  data: PropTypes.object,
};

export default Contact;

export const query = graphql`
  {
    allKontentItemContactPage {
      edges {
        node {
          id
          elements {
            title {
              value
            }
            body {
              resolvedData {
                html
              }
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
    }
  }
`;
