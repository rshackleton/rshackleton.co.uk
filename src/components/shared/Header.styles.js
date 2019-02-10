import styled from '@emotion/styled';
import { Link } from 'gatsby';

import SiteWideBase from '@components/shared/SiteWide';
import { adjustFontSizeTo, rhythm } from '@utils/typography';

export const Container = styled.header`
  position: fixed;
  top: 0;
  display: block;
  height: ${({ theme }) => rhythm(theme.dimensions.header)};
  width: 100%;
  text-shadow: rgba(0, 0, 0, 0.6) 1px 1px 1px;
  z-index: ${({ theme }) => theme.layers.overlay};
`;

export const SiteWide = styled(SiteWideBase)`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  ${adjustFontSizeTo(18)};
  font-weight: normal;
`;

export const TitleLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
`;
