import { motion } from 'framer-motion';
import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { getContentPage, getContentPages } from '@/lib/api';
import BannerImage from '@/components/BannerImage';

interface IContentPageProps {
  contentPage: any;
  preview: boolean;
}

const ContentPage: React.FC<IContentPageProps> = ({ contentPage }) => {
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
      <BannerImage image={contentPage.image} />
      <div className="site-inset">
        <h1 className="font-heading font-bold text-4xl mb-8">{contentPage.title}</h1>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentPage.body }}
        />
      </div>
    </motion.div>
  );
};

export default ContentPage;

export const getStaticProps: GetStaticProps<IContentPageProps, { slug: string }> = async ({
  params,
  preview = false,
}) => {
  const contentPage = await getContentPage(params?.slug ?? '', preview);
  return {
    props: { contentPage, preview },
    // revalidate once per 5 minutes
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const contentPages = await getContentPages(false);

  return {
    paths: contentPages.map((contentPage: any) => ({ params: { slug: contentPage.slug } })),
    fallback: true,
  };
};
