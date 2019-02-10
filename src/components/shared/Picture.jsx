import PropTypes from 'prop-types';
import React from 'react';

const Source = ({ media, srcSet }) => <source srcSet={srcSet} media={media} />;

Source.propTypes = {
  media: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
};

const Picture = ({ className, fallback, sources, ...otherProps }) => (
  <picture>
    {sources}
    <img srcSet={fallback} className={className} {...otherProps} />
  </picture>
);

Picture.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  fallback: PropTypes.string.isRequired,
  sources: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export { Picture as default, Source };
