import React from 'react';
import Head from 'next/head';

interface ISeoProps extends SeoViewModel {}

const Seo: React.FC<ISeoProps> = ({ canonicalUrl, description, image, keywords, title, type }) => {
  return (
    <Head>
      <title>{`${title} | ${process.env.NEXT_PUBLIC_SITE_TITLE}`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={`${title} | ${process.env.NEXT_PUBLIC_SITE_TITLE}`} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={`https://${process.env.NEXT_PUBLIC_HOST}/${canonicalUrl}`} />
      <meta property="og:image" content={`${image}?w=1200&h=1200&fit=crop`} />
    </Head>
  );
};

export default Seo;
