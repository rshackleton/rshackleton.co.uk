import React, { FC } from 'react';

import SearchButton from '@components/search/SearchButton';

import { Container, Link, LinkItem, Links } from './Navigation.styles';
import { INavigationProps } from './Navigation.types';

const Navigation: FC<INavigationProps> = () => (
  <Container>
    <Links>
      <LinkItem>
        <Link to="/articles">Articles</Link>
      </LinkItem>
      <LinkItem>
        <Link to="/about">About</Link>
      </LinkItem>
      <LinkItem>
        <Link to="/contact">Contact</Link>
      </LinkItem>
      <LinkItem>
        <SearchButton />
      </LinkItem>
    </Links>
  </Container>
);

export default Navigation;
