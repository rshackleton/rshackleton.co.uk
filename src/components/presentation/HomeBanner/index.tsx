import React, { FC } from 'react';

import { Banner, Container, Content, Img, TagLine, Title } from './HomeBanner.styles';

import { IHomeBannerProps } from './HomeBanner.types';

const HomeBanner: FC<IHomeBannerProps> = ({ image, imageDescription }) => (
  <Container>
    <Banner>
      <Img alt={imageDescription} fluid={image} />
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

export default HomeBanner;
