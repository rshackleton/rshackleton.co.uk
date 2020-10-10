import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import BannerImage from '@/components/BannerImage';
import RichText from '@/components/RichText';
import Seo from '@/components/Seo';

import { getArticle, getArticles, parseArticle } from '@/lib/api';

import { debug } from '@/util/debug';

interface IArticleProps {
  article: ArticleViewModel | null;
  preview: boolean;
}

const Article: React.FC<IArticleProps> = ({ article }) => {
  const router = useRouter();

  const [body, setBody] = useState(article?.body);
  const [accessControl, setAccessControl] = useState('');

  useEffect(() => {
    doAsync();

    async function doAsync() {
      if (router.isFallback) {
        debug(`isFallback: ${router.isFallback}`);
        return;
      }

      if (!article) {
        debug(`article: ${!!article}`);
        return;
      }

      // If we think this is a Google request then fetch content immediately.
      const isGoogle = navigator.userAgent.toLowerCase().includes('googlebot');

      debug(`userAgent: ${navigator.userAgent}`);
      debug(`googlebot: ${isGoogle}`);

      if (isGoogle) {
        const content = await fetchContent({
          slug: article.slug,
        });

        setBody(content);
      }
    }
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return null;
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-kontent-item-id={article.id}
    >
      <Seo {...article.seo} />
      <BannerImage image={article.image} data-kontent-element-codename="banner" />
      <div className="site-inset">
        <h1
          className="font-heading font-bold text-3xl sm:text-4xl mb-8"
          data-kontent-element-codename="title"
        >
          {article.title}
        </h1>
        {article.isGated && article.leadContent && !body && (
          <div
            className="no-paywall prose sm:prose-lg max-w-none"
            data-kontent-element-codename="lead_content"
          >
            <RichText
              content={article.leadContent.html}
              images={article.leadContent.images}
              linkedItems={article.leadContent.linkedItems}
              links={article.leadContent.links}
            />
          </div>
        )}
        {article.isGated && !body && (
          <form
            className="no-paywall block bg-gray-200 p-8 my-12"
            onSubmit={async (event) => {
              event.preventDefault();

              const content = await fetchContent({
                accessControl: accessControl,
                slug: article.slug,
              });

              setBody(content);
            }}
          >
            <label className="block mb-4 font-bold" htmlFor="accessControl">
              Simply enter something, anything, to access the full article.
            </label>
            <input
              id="accessControl"
              className="block border-gray-700 focus:border-gray-900 border-2 rounded-sm mb-4 p-2 outline-none bg-gray-100 transition-colors duration-150"
              name="accessControl"
              placeholder="e.g. Pineapple 🍍"
              required
              type="text"
              value={accessControl}
              onChange={(event) => setAccessControl(event.target.value)}
            />
            <button
              className="inline-block bg-gray-700 focus:bg-gray-900 hover:bg-gray-900 rounded-sm mb-4 py-2 px-4 text-gray-100 transition-colors duration-150"
              type="submit"
            >
              Gimme Access!
            </button>
          </form>
        )}
        {body && (
          <div
            className="paywall prose sm:prose-lg max-w-none"
            data-kontent-element-codename="body"
          >
            <RichText
              content={body.html}
              images={body.images}
              linkedItems={body.linkedItems}
              links={body.links}
            />
          </div>
        )}
      </div>
    </motion.div>
  );

  async function fetchContent(formData: {
    accessControl?: string;
    slug: string;
  }): Promise<RichTextViewModel | null> {
    const res = await fetch('/api/gated-content', {
      body: JSON.stringify(formData),
      cache: 'no-cache',
      credentials: 'omit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data.body as RichTextViewModel | null;
    } else {
      console.error(`Error: ${data.message}`);
      return null;
    }
  }
};

export default Article;

export const getStaticProps: GetStaticProps<IArticleProps, { slug: string }> = async ({
  params,
  preview = false,
}) => {
  const articleResponse = await getArticle(params?.slug ?? '', preview);
  const article = parseArticle(articleResponse.firstItem, articleResponse.linkedItems);

  // Remove body content if article is gated, this will be retrieved via an API call later.
  if (article) {
    if (article.isGated) {
      article.body = null;
    } else {
      article.leadContent = null;
    }
  }

  return {
    props: {
      article,
      preview,
    },
    // revalidate once per 5 minutes
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesResponse = await getArticles(false);

  return {
    paths: articlesResponse.items.map((article) => ({ params: { slug: article.slug.value } })),
    fallback: true,
  };
};
