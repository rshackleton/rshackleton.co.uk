/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

import { SearchBoxInput, SearchBoxPoweredBy, SearchBoxWrapper } from './SearchBox.styles';
import { ISearchBoxProps } from './SearchBox.types';

const SearchBox: React.FunctionComponent<ISearchBoxProps> = ({ focus, refine }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useLayoutEffect(() => {
    if (!inputRef.current) {
      return;
    }

    if (!focus) {
      return;
    }

    requestAnimationFrame(() => inputRef.current && inputRef.current.focus());
  }, [focus]);

  return (
    <SearchBoxWrapper
      onSubmit={event => {
        event.preventDefault();
        const value = new FormData(event.currentTarget).get('search-input');
        refine(value);
      }}
    >
      <SearchBoxInput ref={inputRef} name="search-input" type="search" />
      <SearchBoxPoweredBy />
    </SearchBoxWrapper>
  );
};

export default connectSearchBox<ISearchBoxProps>(SearchBox);
