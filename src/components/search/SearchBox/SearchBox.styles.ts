import { PoweredBy } from 'react-instantsearch-dom';

import { TextBox } from '@components/forms/ContactForm/ContactForm.styles';

import mq from '@utils/mq';
import styled from '@utils/styled';
import { adjustFontSizeTo, rhythm } from '@utils/typography';

export const SearchBoxWrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.headerFontFamily};
  ${{ ...adjustFontSizeTo(14) }}
  justify-content: stretch;
  margin-bottom: ${rhythm(1)};
  width: 100%;

  ${mq.sm} {
    flex-direction: row;
  }
`;

export const SearchBoxInput = styled(TextBox)`
  flex: 1 1 auto;
  margin: 0 0 ${rhythm(0.5)};
  max-width: none;

  ${mq.sm} {
    margin: 0 ${rhythm(0.5)} 0 0;
  }
`;

export const SearchBoxPoweredBy = styled(PoweredBy)`
  flex: 1 0 auto;
  margin: 0;

  span {
    margin-right: ${rhythm(0.25)};
  }
`;
