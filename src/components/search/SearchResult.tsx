import { usePageContext } from '@components/PageContext';
import { Link } from 'gatsby';
import * as React from 'react';
import { Hit } from 'react-instantsearch-core';
import { useSearchModal } from './SearchModal';

interface ISearchableItem {
  content: string;
  modified: Date;
  modified_unix: number;
  published: Date;
  published_unix: number;
  tags: [string];
  title: string;
  type: string;
  url: string;
  _snippetResult: {
    content: {
      value: string;
    };
  };
}

interface ISearchResultProps {
  hit: Hit<ISearchableItem>;
}

const SearchResult: React.FunctionComponent<ISearchResultProps> = ({ hit }) => {
  const { path } = usePageContext();
  const [, setShowModal] = useSearchModal();

  return (
    <article>
      <h3>
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
          {hit.title}
        </Link>
      </h3>
      <p
        dangerouslySetInnerHTML={{ __html: hit._snippetResult.content.value }}
      />
    </article>
  );
};

export default SearchResult;
