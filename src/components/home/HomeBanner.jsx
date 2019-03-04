import PropTypes from 'prop-types';
import React from 'react';

import { Source } from '@components/shared/Picture';
import { rules } from '@utils/mq';

import {
  Banner,
  Container,
  Content,
  Picture,
  TagLine,
  Title,
} from './HomeBanner.styles';

const HomeBanner = ({ image, imageDescription }) => {
  const srcs = {
    xl: `${image}?w=1920&auto=format 1x, ${image}?w=3840&auto=format 2x`,
    lg: `${image}?w=1200&auto=format 1x, ${image}?w=2400&auto=format 2x`,
    md: `${image}?w=992&auto=format 1x, ${image}?w=1984&auto=format 2x`,
    sm: `${image}?w=768&auto=format 1x, ${image}?w=1536&auto=format 2x`,
    xs: `${image}?w=576&auto=format 1x, ${image}?w=1152&auto=format 2x`,
  };

  const lowSrc = `${image}?w=576&auto=format`;

  return (
    <Container>
      <Banner>
        <Picture
          alt={imageDescription}
          fallback={`${image}?w=320&auto=format 1x, ${image}?w=640&auto=format 2x`}
          lowSrc={lowSrc}
          sources={Object.entries(srcs).map(([key, src]) => {
            const rule = rules[key];
            return (
              <Source key={key} lowSrc={lowSrc} media={rule} srcSet={src} />
            );
          })}
        />
      </Banner>
      <Content>
        <Title>
          <span>Richard Shackleton</span>
        </Title>
        <br />
        <TagLine>
          <span>Web developer</span>
        </TagLine>
      </Content>
    </Container>
  );
};

HomeBanner.propTypes = {
  image: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
};

export default HomeBanner;
