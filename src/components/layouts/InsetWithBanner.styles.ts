import styled from '@emotion/styled';

import BannerBase from '@components/shared/Banner';
import ContainerInsetBase from '@components/shared/ContainerInset';
import { rhythm } from '@utils/typography';
import { Theme } from '@utils/theme';

export const Banner = styled(BannerBase)<{ theme: Theme }>`
  position: fixed;
  top: ${({ theme }) => rhythm(theme.dimensions.header)};
  width: 100%;
`;

export const ContainerInset = styled(ContainerInsetBase)<{ theme: Theme }>`
  margin-top: ${({ theme }) => rhythm(theme.dimensions.banner)};
`;

export const ContentWrapper = styled.main``;
