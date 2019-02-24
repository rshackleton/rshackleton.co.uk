import get from 'lodash/get';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import ogDefaultImage from '@assets/og-default.jpg';

const SEO = ({
  title,
  description,
  keywords,
  image,
  imageDescription,
  prefix,
  type,
  url,
  extraTags,
}) => {
  const data = useStaticQuery(
    graphql`
      {
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

  const lang = get(data, 'site.siteMetadata.lang');
  const locale = get(data, 'site.siteMetadata.locale');
  const siteTitle = get(data, 'site.siteMetadata.title');
  const siteUrl = get(data, 'site.siteMetadata.siteUrl');
  const twitterUsername = get(data, 'site.siteMetadata.twitterUsername');

  const imageUrl = `${image}?w=1080&h=1080&fit=crop&format=jpg`;

  const htmlAttributes = {
    lang,
    prefix,
  };

  return (
    <>
      <Helmet htmlAttributes={htmlAttributes}>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={twitterUsername} />
        <meta name="twitter:creator" content={twitterUsername} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={`${siteUrl}${url}`} />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content={siteTitle} />
      </Helmet>
      {image && image.length ? (
        <Helmet>
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:alt" content={imageDescription} />
          <meta property="og:image:width" content={1080} />
          <meta property="og:image:height" content={1080} />
        </Helmet>
      ) : (
        <Helmet>
          <meta property="og:image" content={ogDefaultImage} />
          <meta property="og:image:alt" content="" />
          <meta property="og:image:width" content={1080} />
          <meta property="og:image:height" content={1080} />
        </Helmet>
      )}
      {extraTags && extraTags.length ? <Helmet>{extraTags}</Helmet> : null}
    </>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  extraTags: PropTypes.arrayOf(PropTypes.node),
  keywords: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageDescription: PropTypes.string,
  prefix: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string.isRequired,
};

SEO.defaultProps = {
  extraTags: [],
  image: '',
  imageDescription: '',
  prefix: 'og: http://ogp.me/ns#',
  type: 'website',
};

export default SEO;
