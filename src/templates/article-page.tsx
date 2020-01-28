import ArticleFooter from '@components/article-page/ArticleFooter';
import ArticleHeader from '@components/article-page/ArticleHeader';
import Layout from '@components/layouts/InsetWithBanner';
import RichText from '@components/shared/RichText';
import SEO from '@components/shared/SEO';
import { graphql } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';
import { Article, Site } from 'index';
import React, { FC } from 'react';

interface ArticlePageProps {
  data: {
    kontentItemArticle: Article;
    site: Site;
  };
}

const ArticleTemplate: FC<ArticlePageProps> = ({
  data: {
    kontentItemArticle: data,
    site: {
      siteMetadata: { siteUrl },
    },
  },
}) => {
  const id = data.system.id;
  const banner = data.elements.banner.value[0].fluid;
  const bannerDescription = data.elements.banner.value[0].description;
  const content = data.elements.body.resolvedData.html;
  const date = new Date(data.elements.date.value);
  const images = data.elements.body.images;
  const links = data.elements.body.links;
  const linkedItems = data.elements.body.linked_items;
  const slug = data.elements.slug.value;
  const tags = data.elements.article_tags.value;
  const title = data.elements.title.value || '';

  const ogImage = data.elements.metadata__open_graph_image.value[0];

  const isoDate = date.toISOString();

  const ogArticleTags = tags.map(tag => (
    <meta key={tag.codename} property="article:tag" content={tag.name} />
  ));

  const seo = {
    title: data.elements.metadata__page_title.value,
    description: data.elements.metadata__page_description.value,
    keywords: data.elements.metadata__page_keywords.value,
    image: ogImage ? ogImage.url : null,
    imageDescription: ogImage ? ogImage.description : null,
    prefix: 'og: http://ogp.me/ns# article: http://ogp.me/ns/article#',
    type: 'article',
    url: `/articles/${slug}`,
    extraTags: [
      <meta
        key="article:published_time"
        property="article:published_time"
        content={isoDate}
      />,
      <meta
        key="article:author"
        property="article:author"
        content="Richard Shackleton"
      />,
      <meta
        key="article:section"
        property="article:section"
        content="Technology"
      />,
      ...ogArticleTags,
    ],
  };

  const disqusConfig = {
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

export default ArticleTemplate;

export const query = graphql`
  query Article($slug: String!) {
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
            fluid(maxWidth: 1920) {
              ...KontentAssetFluid
            }
          }
        }
        body {
          resolvedData {
            html
          }
          images {
            imageId
            description
            fluid(maxWidth: 788) {
              ...KontentAssetFluid
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
