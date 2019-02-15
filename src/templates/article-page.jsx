import get from 'lodash/get';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import ArticleFooter from '@components/article-page/ArticleFooter';
import ArticleHeader from '@components/article-page/ArticleHeader';
import Layout from '@components/layouts/InsetWithBanner';
import RichText from '@components/shared/RichText';
import SEO from '@components/shared/SEO';

const ArticlePage = ({ data: { kenticoCloudItemArticle: data } }) => {
  const seo = {
    title: get(data, 'elements.metadata__page_title.value'),
    description: get(data, 'elements.metadata__page_description.value'),
    keywords: get(data, 'elements.metadata__page_keywords.value'),
  };

  const banner = get(data, 'elements.banner.value[0].url');
  const bannerDescription = get(data, 'elements.banner.value[0].description');
  const content = get(data, 'elements.body.resolvedHtml');
  const date = new Date(get(data, 'elements.date.value'));
  const images = get(data, 'elements.body.images');
  const links = get(data, 'elements.body.links');
  const linkedItems = get(data, 'elements.body.linked_items');
  const tags = get(data, 'elements.article_tags.taxonomyTerms');
  const title = get(data, 'elements.title.value');

  return (
    <Layout banner={banner} bannerDescription={bannerDescription}>
      <SEO {...seo} />
      <ArticleHeader date={date} title={title} />
      <RichText
        content={content}
        images={images}
        links={links}
        linkedItems={linkedItems}
      />
      <ArticleFooter tags={tags} />
    </Layout>
  );
};

export default ArticlePage;

export const query = graphql`
  query($slug: String!) {
    kenticoCloudItemArticle(elements: { slug: { value: { eq: $slug } } }) {
      elements {
        title {
          value
        }
        date {
          datetime
          value
        }
        article_tags {
          taxonomyTerms {
            codename
            name
          }
        }
        banner {
          value {
            description
            url
          }
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
