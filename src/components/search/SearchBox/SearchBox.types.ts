import { SearchBoxProvided } from 'react-instantsearch-core';

export interface ISearchBoxProps extends SearchBoxProvided {
  focus: boolean | undefined;
}
