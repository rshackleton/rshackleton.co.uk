import { motion } from 'framer-motion';
import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { getArticleListing, getArticles, parseArticle, parseArticleListing } from '@/lib/api';
import BannerImage from '@/components/BannerImage';

interface IArticlesProps {
  articles: any[];
  articleListing: any;
}

const Articles: React.FC<IArticlesProps> = ({ articles, articleListing }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BannerImage image={articleListing.image} />
      <div className="site-inset">
        <h1 className="font-heading font-bold text-4xl mb-8">{articleListing.title}</h1>
        {articles.map((article) => (
          <Link key={article.id} href="/articles/[slug]" as={`/articles/${article.slug}`}>
            <a className="group flex flex-col justify-center mb-8">
              <h2 className="font-heading font-bold text-2xl mb-4 group-hover:underline">
                {article.title}
              </h2>
              <p>{article.summary}</p>
            </a>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const articlesResponse = await getArticles(preview);
  const articles = articlesResponse.items.map((item) => parseArticle(item));

  const articleListingResponse = await getArticleListing(preview);
  const articleListing = parseArticleListing(articleListingResponse.firstItem);

  return {
    props: { articles, articleListing, preview },
    // revalidate once per 5 minutes
    revalidate: 300,
  };
};
