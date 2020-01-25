import styled from '@utils/styled';
import { adjustFontSizeTo } from '@utils/typography';

export const Button = styled.button`
  display: block;
  background: none;
  border: 0;
  color: ${({ theme }) => theme.colors.body};
  cursor: pointer;
  ${{ ...adjustFontSizeTo(16) }};
  margin: 0;
  outline: 0;
  padding: 0;

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.colors.body};
  }
`;
