import { motion } from 'framer-motion';
import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { getArticle, getArticles, parseArticle } from '@/lib/api';
import BannerImage from '@/components/BannerImage';
import RichText from '@/components/RichText';
import Seo from '@/components/Seo';

interface IArticleProps {
  article: ArticleViewModel | null;
  preview: boolean;
}

const Article: React.FC<IArticleProps> = ({ article }) => {
  const router = useRouter();

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
        {article.body && (
          <div className="prose sm:prose-lg max-w-none" data-kontent-element-codename="body">
            <RichText
              content={article.body.html}
              images={article.body.images}
              linkedItems={article.body.linkedItems}
              links={article.body.links}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Article;

export const getStaticProps: GetStaticProps<IArticleProps, { slug: string }> = async ({
  params,
  preview = false,
}) => {
  const articleResponse = await getArticle(params?.slug ?? '', preview);
  const article = parseArticle(articleResponse.firstItem, articleResponse.linkedItems);

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
