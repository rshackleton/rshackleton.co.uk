/** @jsx jsx */
import { usePageContext } from '@components/PageContext';
import { jsx } from '@emotion/core';
import { Link } from 'gatsby';
import * as React from 'react';
import { Hit } from 'react-instantsearch-core';
import { Highlight } from 'react-instantsearch-dom';
import { useSearchModal } from './SearchModal';
import {
  SearchResultContent,
  SearchResultMeta,
  SearchResultTitle,
} from './SearchResult.styles';

interface ISearchableItem {
  content: string;
  modified: Date;
  modified_unix: number;
  published: Date;
  published_unix: number;
  title: string;
  type: string;
  url: string;
  _tags: [string];
}

interface ISearchResultProps {
  hit: Hit<ISearchableItem>;
}

const SearchResult: React.FunctionComponent<ISearchResultProps> = ({ hit }) => {
  const { path } = usePageContext();
  const [, setShowModal] = useSearchModal();

  return (
    <article>
      <SearchResultTitle>
        <Link
          to={hit.url}
          onClick={event => {
            // If we're already on this page then just close the modal.
            if (path === hit.url) {
              event.preventDefault();
              setShowModal && setShowModal(false);
            }
          }}
        >
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </Link>
      </SearchResultTitle>
      <SearchResultContent attribute="content" hit={hit} tagName="mark" />
      <SearchResultMeta>
        <Highlight
          attribute="_tags"
          hit={hit}
          separator={null}
          tagName="mark"
        />
        {/* {hit._tags && hit._tags.map(tag => <span key={tag}>{tag}</span>)} */}
      </SearchResultMeta>
    </article>
  );
};

export default SearchResult;
