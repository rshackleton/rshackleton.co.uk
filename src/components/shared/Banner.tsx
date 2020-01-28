import { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';
import { Container, Img } from './Banner.styles';

export interface IBannerProps {
  image: FluidObject;
  imageDescription?: string;
}

const Banner: FC<IBannerProps> = ({
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
