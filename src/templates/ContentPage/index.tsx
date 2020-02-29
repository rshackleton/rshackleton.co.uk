import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout from '@components/layouts/InsetWithBanner';
import RichText from '@components/connected/RichText';
import SEO from '@components/connected/SEO';

import { IContentPageProps } from './ContentPage.types';

const ContentPageTemplate: FC<IContentPageProps> = ({ data: { kontentItemContentPage: data } }) => {
  const ogImage = data.elements.metadata__open_graph_image.value[0];
  const slug = data.elements.slug.value;

  const seo = {
    title: data.elements.metadata__page_title.value,
    description: data.elements.metadata__page_description.value,
    keywords: data.elements.metadata__page_keywords.value,
    image: ogImage ? ogImage.url : null,
    imageDescription: ogImage ? ogImage.description : null,
    url: `/${slug}`,
  };

  const banner = data.elements.banner.value[0].fluid;
  const bannerDescription = data.elements.banner.value[0].description;
  const content = data.elements.body.resolvedData.html;
  const images = data.elements.body.images;
  const links = data.elements.body.links;
  const linkedItems = data.elements.body.linked_items;
  const title = data.elements.title.value;

  return (
    <Layout banner={banner} bannerDescription={bannerDescription}>
      <SEO {...seo} />
      <h1>{title}</h1>
      <RichText content={content} images={images} links={links} linkedItems={linkedItems} />
    </Layout>
  );
};

export default ContentPageTemplate;

export const query = graphql`
  query Content($slug: String!) {
    kontentItemContentPage(elements: { slug: { value: { eq: $slug } } }) {
      id
      elements {
        title {
          value
        }
        slug {
          value
        }
        body {
          resolvedData {
            html
          }
          images {
            imageId
            description
            fluid(maxWidth: 788) {
              ...KontentAssetFluid_withWebp
            }
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
`;
