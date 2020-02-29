import { Hit } from 'react-instantsearch-core';

export interface ISearchableItem {
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

export interface ISearchResultProps {
  hit: Hit<ISearchableItem>;
}
