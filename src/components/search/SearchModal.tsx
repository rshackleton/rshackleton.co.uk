/** @jsx jsx */
import Modal from '@components/modal/Modal';
import { usePageContext } from '@components/PageContext';
import { css, jsx } from '@emotion/core';
import { rhythm } from '@utils/typography';
import { QueryParameters } from 'algoliasearch';
import algoliasearch from 'algoliasearch/lite';
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import 'instantsearch.css/themes/reset-min.css';
import * as React from 'react';
import { Configure, Hits, InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

/**
 * SearchModal props.
 */
interface ISearchModalProps {}

/**
 * SearchModalProvider props.
 */
interface ISearchModalProviderProps {
  children: React.ReactNode;
}

/**
 * Modal state.
 */
type SearchModalContextValue =
  | [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  | [];

/**
 * Store modal state.
 */
const SearchModalContext = React.createContext<SearchModalContextValue>([]);

/**
 * Provide access to modal state.
 * @param props
 */
const SearchModalProvider: React.FC<ISearchModalProviderProps> = ({
  children,
}) => {
  const value = React.useState<boolean>(false);

  return (
    <SearchModalContext.Provider value={value}>
      {children}
    </SearchModalContext.Provider>
  );
};

/**
 * Provide access to modal state.
 */
const useSearchModal = (): SearchModalContextValue =>
  React.useContext(SearchModalContext);

const algolia = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_API_KEY || '',
);

const searchClient = {
  search(
    queries: {
      indexName: string;
      query: string;
      params: QueryParameters;
    }[],
  ) {
    if (queries.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: queries.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algolia.search(queries);
  },
};

/**
 * The search modal.
 */
const SearchModal: React.FC<ISearchModalProps> = () => {
  const { location } = usePageContext();
  const [showModal, setShowModal] = useSearchModal();
  const scrollableRef = React.useRef<HTMLDivElement>(null);

  const locationKey = location?.key || '';

  // Ensure modal is hidden when location changes.
  React.useEffect(() => {
    setShowModal && setShowModal(false);
  }, [locationKey]);

  React.useLayoutEffect(() => {
    if (!scrollableRef.current) {
      return;
    }

    if (showModal) {
      disableBodyScroll(scrollableRef.current);
    } else {
      enableBodyScroll(scrollableRef.current);
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [showModal]);

  return (
    <Modal
      visible={showModal || false}
      onClose={event => {
        event.preventDefault();
        setShowModal && setShowModal(false);
      }}
    >
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME || ''}
      >
        <Configure />
        <SearchBox focus={showModal} />
        <div
          css={css`
            overflow-y: auto;
          `}
          ref={scrollableRef}
        >
          <Hits
            css={css`
              li {
                margin-bottom: ${rhythm(1)};
              }
            `}
            hitComponent={SearchResult}
          />
        </div>
      </InstantSearch>
    </Modal>
  );
};

export { SearchModal as default, SearchModalProvider, useSearchModal };
