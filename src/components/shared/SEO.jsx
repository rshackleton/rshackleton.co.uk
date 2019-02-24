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
  url,
}) => {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            locale
            siteUrl
            title
            twitterUsername
          }
        }
      }
    `,
  );

  const locale = get(data, 'site.siteMetadata.locale');
  const siteTitle = get(data, 'site.siteMetadata.title');
  const siteUrl = get(data, 'site.siteMetadata.siteUrl');
  const twitterUsername = get(data, 'site.siteMetadata.twitterUsername');

  return (
    <>
      <Helmet>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={twitterUsername} />
        <meta name="twitter:creator" content={twitterUsername} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}${url}`} />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content={siteTitle} />
      </Helmet>
      {image && image.length ? (
        <Helmet>
          <meta property="og:image" content={`${image}?w=1000&auto=format`} />
          <meta property="og:image:alt" content={imageDescription} />
        </Helmet>
      ) : (
        <Helmet>
          <meta property="og:image" content={ogDefaultImage} />
          <meta property="og:image:alt" content="" />
        </Helmet>
      )}
    </>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageDescription: PropTypes.string,
  url: PropTypes.string.isRequired,
};

SEO.defaultProps = {
  image: '',
  imageDescription: '',
};

export default SEO;
