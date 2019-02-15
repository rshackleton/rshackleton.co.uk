import styled from '@emotion/styled';

import BannerBase from '@components/shared/Banner';
import ContainerInsetBase from '@components/shared/ContainerInset';
import { rhythm } from '@utils/typography';

export const Banner = styled(BannerBase)`
  position: fixed;
  top: ${({ theme }) => rhythm(theme.dimensions.header)};
  width: 100%;
`;

export const ContainerInset = styled(ContainerInsetBase)`
  margin-top: ${({ theme }) => rhythm(theme.dimensions.banner)};
`;

export const ContentWrapper = styled.main``;
