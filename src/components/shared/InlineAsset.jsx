import PropTypes from 'prop-types';
import React from 'react';

import { Source } from '@components/shared/Picture';
import { rules } from '@utils/mq';

import { Picture } from './InlineAsset.styles';

const InlineAsset = ({ description, id, url }) => {
  const srcs = {
    xl: `${url}?w=900&auto=format 1x, ${url}?w=1800&auto=format 2x`,
    lg: `${url}?w=900&auto=format 1x, ${url}?w=1800&auto=format 2x`,
    md: `${url}?w=900&auto=format 1x, ${url}?w=1800&auto=format 2x`,
    sm: `${url}?w=768&auto=format 1x, ${url}?w=1536&auto=format 2x`,
    xs: `${url}?w=576&auto=format 1x, ${url}?w=1152&auto=format 2x`,
  };

  const lowSrc = `${url}?w=100&auto=format`;

  return (
    <Picture
      key={id}
      alt={description}
      fallback={`${url}?w=320&auto=format 1x, ${url}?w=640&auto=format 2x`}
      lowSrc={lowSrc}
      sources={Object.entries(srcs).map(([key, src]) => {
        const rule = rules[key];
        return <Source key={key} lowSrc={lowSrc} media={rule} srcSet={src} />;
      })}
    />
  );
};

InlineAsset.propTypes = {
  description: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
};

export default InlineAsset;
