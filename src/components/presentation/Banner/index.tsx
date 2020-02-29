import React, { FC } from 'react';

import { Container, Img } from './Banner.styles';
import { IBannerProps } from './Banner.types';

const Banner: FC<IBannerProps> = ({ image, imageDescription, ...otherProps }) => {
  return (
    <Container {...otherProps}>
      <Img alt={imageDescription} fluid={image} />
    </Container>
  );
};

export default Banner;
