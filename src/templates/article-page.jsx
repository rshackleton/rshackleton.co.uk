import { graphql } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import ArticleFooter from '@components/article-page/ArticleFooter';
import ArticleHeader from '@components/article-page/ArticleHeader';
import Layout from '@components/layouts/InsetWithBanner';
import RichText from '@components/shared/RichText';
import SEO from '@components/shared/SEO';

const ArticlePage = ({
  data: {
    kontentItemArticle: data,
    site: {
      siteMetadata: { siteUrl },
    },
  },
}) => {
  const id = get(data, 'system.id');
  const banner = get(data, 'elements.banner.value[0].url');
  const bannerDescription = get(data, 'elements.banner.value[0].description');
  const content = get(data, 'elements.body.resolvedData.html');
  const date = new Date(get(data, 'elements.date.value'));
  const images = get(data, 'elements.body.images');
  const links = get(data, 'elements.body.links');
  const linkedItems = get(data, 'elements.body.linked_items');
  const slug = get(data, 'elements.slug.value');
  const tags = get(data, 'elements.article_tags.value');
  const title = get(data, 'elements.title.value');

  const ogImage = get(data, 'elements.metadata__open_graph_image.value[0]');

  const isoDate = date.toISOString();

  const ogArticleTags = tags.map(tag => (
    <meta key={tag.codename} property="article:tag" value={tag.name} />
  ));

  const seo = {
    title: get(data, 'elements.metadata__page_title.value'),
    description: get(data, 'elements.metadata__page_description.value'),
    keywords: get(data, 'elements.metadata__page_keywords.value'),
    image: ogImage ? ogImage.url : null,
    imageDescription: ogImage ? ogImage.description : null,
    prefix: 'og: http://ogp.me/ns# article: http://ogp.me/ns/article#',
    type: 'article',
    url: `/articles/${slug}`,
    extraTags: [
      <meta
        key="article:published_time"
        property="article:published_time"
        value={isoDate}
      />,
      <meta
        key="article:author"
        property="article:author"
        value="Richard Shackleton"
      />,
      <meta
        key="article:section"
        property="article:section"
        value="Technology"
      />,
      ...ogArticleTags,
    ],
  };

  let disqusConfig = {
    url: `${siteUrl + seo.url}`,
    identifier: id,
    title,
  };

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
      <Disqus config={disqusConfig} />
    </Layout>
  );
};

ArticlePage.propTypes = {
  data: PropTypes.object,
};

export default ArticlePage;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    kontentItemArticle(elements: { slug: { value: { eq: $slug } } }) {
      system {
        id
      }
      elements {
        title {
          value
        }
        slug {
          value
        }
        date {
          value
        }
        article_tags {
          value {
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
