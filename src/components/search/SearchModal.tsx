import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import * as React from 'react';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-dom';

interface ISearchModalProps {}

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_API_KEY || '',
);

const SearchModal: React.FC<ISearchModalProps> = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME || ''}
    >
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
};

export default SearchModal;
