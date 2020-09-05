import { motion } from 'framer-motion';
import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { getArticle, getArticles } from '@/lib/api';
import BannerImage from '@/components/BannerImage';

interface IArticleProps {
  article: any;
  preview: boolean;
}

const Article: React.FC<IArticleProps> = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BannerImage image={article.image} />
      <div className="site-inset">
        <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-8">{article.title}</h1>
        <div
          className="prose sm:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </div>
    </motion.div>
  );
};

export default Article;

export const getStaticProps: GetStaticProps<IArticleProps, { slug: string }> = async ({
  params,
  preview = false,
}) => {
  const article = await getArticle(params?.slug ?? '', preview);
  return {
    props: { article, preview },
    // revalidate once per 5 minutes
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles(false);

  return {
    paths: articles.map((article: any) => ({ params: { slug: article.slug } })),
    fallback: true,
  };
};
