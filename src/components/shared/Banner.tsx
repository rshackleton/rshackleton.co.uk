import { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';

import { Container, Img } from './Banner.styles';

export interface BannerProps {
  image: FluidObject;
  imageDescription?: string;
}

const Banner: FC<BannerProps> = ({
  image,
  imageDescription,
  ...otherProps
}) => {
  return (
    <Container {...otherProps}>
      <Img alt={imageDescription} fluid={image} />
    </Container>
  );
};

export default Banner;
