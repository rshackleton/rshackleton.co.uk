import { Snippet } from 'react-instantsearch-dom';

import styled from '@utils/styled';
import { adjustFontSizeTo, rhythm } from '@utils/typography';

export const SearchResultTitle = styled.h3`
  display: block;
  ${{ ...adjustFontSizeTo(18) }};
  margin-bottom: ${rhythm(0.25)};

  mark {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.colors.body};
  }
`;

export const SearchResultContent = styled(Snippet)`
  display: block;
  ${{ ...adjustFontSizeTo(16) }};
  margin-bottom: ${rhythm(0.25)};

  mark {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.colors.body};
  }
`;

export const SearchResultMeta = styled.div`
  display: flex;
  ${{ ...adjustFontSizeTo(12) }};

  .ais-Highlight > span {
    &:after {
      content: '|';
      margin: 0 ${rhythm(0.25)};
    }

    &:last-child:after {
      content: none;
    }
  }

  .ais-Highlight-separator {
    display: none;
  }

  mark {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.colors.body};
  }
`;
