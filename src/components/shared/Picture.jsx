/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import PropTypes from 'prop-types';

if (typeof window !== `undefined`) {
  require('lazysizes/plugins/attrchange/ls.attrchange');
  require('lazysizes/plugins/respimg/ls.respimg');
  require('lazysizes/plugins/object-fit/ls.object-fit');
  require('lazysizes/plugins/parent-fit/ls.parent-fit');
  require('lazysizes/plugins/blur-up/ls.blur-up');
  require('lazysizes');
}

const Source = ({ lowSrc, media, srcSet }) => (
  <source data-srcset={srcSet} data-lowsrc={lowSrc} media={media} />
);

Source.propTypes = {
  lowSrc: PropTypes.string,
  media: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
};

Source.defaultProps = {
  lowSrc: null,
};

const Picture = ({ className, fallback, lowSrc, sources, ...otherProps }) => (
  <div
    css={css`
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `}
  >
    <Global
      styles={css`
        .ls-blur-up-img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          display: block;
          height: 100%;
          width: 100%;

          filter: blur(10px);
          object-fit: cover;
          opacity: 1;
          transform: scale(1.03);
          transition: opacity 1s, filter 1.5s, transform 1.5s;

          &.ls-inview.ls-original-loaded {
            filter: blur(5px);
            opacity: 0;
            transform: scale(1);
          }
        }
      `}
    />
    <picture>
      {sources}
      <source data-srcset={fallback} data-lowsrc={lowSrc} />
      <img
        css={css`
          font-family: 'blur-up: unobtrusive', 'object-fit: cover';
          opacity: 0;
          transition: opacity cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s;

          &.lazyloaded {
            opacity: 1;
          }
        `}
        className={`lazyload ${className}`}
        {...otherProps}
        data-lowsrc={lowSrc}
        data-sizes="auto"
      />
    </picture>
  </div>
);

Picture.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  fallback: PropTypes.string.isRequired,
  lowSrc: PropTypes.string,
  sources: PropTypes.arrayOf(PropTypes.node).isRequired,
};

Picture.defaultProps = {
  lowSrc: null,
};

export { Picture as default, Source };
