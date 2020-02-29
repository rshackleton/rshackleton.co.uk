import { graphql, useStaticQuery } from 'gatsby';
import { Schema } from 'schema';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

import ogDefaultImage from '@assets/og-default.jpg';

import { ISEOProps } from './SEO.types';

const SEO: FC<ISEOProps> = ({
  title,
  description,
  keywords,
  image,
  imageDescription,
  prefix = 'og: http://ogp.me/ns#',
  type = 'website',
  url,
  extraTags = [],
}) => {
  const data: { site: Schema.ISite } = useStaticQuery(
    graphql`
      query SEOSiteData {
        site {
          siteMetadata {
            lang
            locale
            siteUrl
            title
            twitterUsername
          }
        }
      }
    `,
  );

  const locale = data.site.siteMetadata.locale;
  const siteTitle = data.site.siteMetadata.title;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const twitterUsername = data.site.siteMetadata.twitterUsername;

  const imageUrl = `${image}?w=1080&h=1080&fit=crop&format=jpg`;

  const htmlAttributes = {
    lang: 'en',
    prefix,
  };

  return (
    <>
      <Helmet htmlAttributes={htmlAttributes}>
        <title>{`${title} | ${siteTitle}`}</title>
        {description ? <meta name="description" content={description} /> : null}
        {keywords ? <meta name="keywords" content={keywords} /> : null}

        <meta name="twitter:card" content="summary" />
        {twitterUsername ? <meta name="twitter:site" content={twitterUsername} /> : null}
        {twitterUsername ? <meta name="twitter:creator" content={twitterUsername} /> : null}

        {title ? <meta property="og:title" content={title} /> : null}
        {description ? <meta property="og:description" content={description} /> : null}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={`${siteUrl}${url}`} />
        {locale ? <meta property="og:locale" content={locale} /> : null}
        {siteTitle ? <meta property="og:site_name" content={siteTitle} /> : null}
      </Helmet>
      {image && image.length ? (
        <Helmet>
          <meta property="og:image" content={imageUrl} />
          {imageDescription ? <meta property="og:image:alt" content={imageDescription} /> : null}
          <meta property="og:image:width" content="1080" />
          <meta property="og:image:height" content="1080" />
        </Helmet>
      ) : (
        <Helmet>
          <meta property="og:image" content={ogDefaultImage} />
          <meta property="og:image:alt" content="" />
          <meta property="og:image:width" content="1080" />
          <meta property="og:image:height" content="1080" />
        </Helmet>
      )}
      {extraTags && extraTags.length ? <Helmet>{extraTags}</Helmet> : null}
    </>
  );
};

export default SEO;
